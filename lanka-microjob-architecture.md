# Lanka MicroJob — Architecture & Microservices Specification

This document contains the official Mermaid.js architecture diagrams for **Lanka MicroJob**, matching all services, ports, deployment infrastructure, CI/CD pipeline, and performance load test metrics.

---

## 1. Complete System Architecture & Deployment Diagram

```mermaid
flowchart TD
    %% ── 1. CLIENT & CDN LAYER ──
    subgraph ClientLayer["🌐 1. Client & Frontend Layer"]
        User["👤 End Users / Job Seekers / Employers"]
        Vercel["⚡ Vercel Edge Network<br/><b>React SPA Frontend</b>"]
        User -->|HTTPS| Vercel
    end

    %% ── 2. AWS CLOUD INFRASTRUCTURE ──
    subgraph AWSCloud["☁️ 2. AWS Cloud Infrastructure"]
        
        ElasticIP["🌐 AWS Elastic IP<br/><b>Static Public Entrypoint</b>"]
        Vercel -->|HTTPS REST API Calls| ElasticIP

        %% EC2 k3s Kubernetes Cluster
        subgraph EC2Host["🖥️ AWS EC2 Instance (Ubuntu Linux)"]
            subgraph K3sCluster["☸️ k3s Kubernetes Cluster"]
                
                %% API Gateway
                Gateway["🚪 API Gateway (:9000)<br/>• Single Entry Point<br/>• Request Routing<br/>• CORS Handling"]
                ElasticIP -->|Port 80/443| Gateway

                %% Microservices Pods
                subgraph Microservices["📦 Spring Boot Microservices"]
                    direction TB
                    
                    UserSvc["👤 User Service (:9001)<br/>• User Registration<br/>• JWT Auth Generation<br/>• Admin Approval Flow"]
                    
                    JobSvc["💼 Job Service (:9002)<br/>• Job Post Management<br/>• Application Lifecycle<br/>• Capacity Locking"]
                    
                    MatchingSvc["🎯 Matching Service (:9003)<br/>• Skill Coverage Score<br/>• District Compatibility<br/>• Deterministic Engine"]
                    
                    BrokerSvc["🤝 Broker Service (:9004)<br/>• Offline Worker Management<br/>• Proxy Placements<br/>• Commission Math"]
                    
                    NotifSvc["🔔 Notification Svc (:9005)<br/>• Event Audit Logs<br/>• Simulated Providers<br/>• System Notifications"]
                end

                %% Ingress Routing
                Gateway -->|/api/users/*| UserSvc
                Gateway -->|/api/jobs/*| JobSvc
                Gateway -->|/api/match/*| MatchingSvc
                Gateway -->|/api/broker/*| BrokerSvc
                Gateway -->|/api/notify/*| NotifSvc

                %% Inter-service events
                JobSvc -.->|Trigger Match| MatchingSvc
                JobSvc -.->|Trigger Notification| NotifSvc
                BrokerSvc -.->|Proxy Job Creation| JobSvc
                UserSvc -.->|User Event| NotifSvc
            end
        end

        %% Managed Database
        subgraph DataLayer["🗄️ 3. Managed Database (AWS VPC Private Subnet)"]
            RDS[("🐘 Amazon RDS PostgreSQL<br/>• Relational Schemas<br/>• Foreign-Key Constraints<br/>• Transaction Isolation")]
            UserSvc -->|Connection Pool| RDS
            JobSvc -->|Connection Pool| RDS
            MatchingSvc -->|Read Skills & Districts| RDS
            BrokerSvc -->|Commission & Placements| RDS
            NotifSvc -->|Persist Audit Logs| RDS
        end

    end

    %% ── 4. AUTOMATED CI/CD PIPELINE ──
    subgraph CICDPipeline["🚀 4. Automated CI/CD Pipeline"]
        GitHub["🐙 GitHub Repository<br/><b>(Push to main branch)</b>"]
        
        subgraph AWSPipeline["🔄 AWS CodePipeline"]
            SourceStage["1️⃣ Source Stage<br/><i>Webhook Detection</i>"]
            BuildStage["2️⃣ Build & Test Stage<br/><i>AWS CodeBuild</i>"]
            DeployStage["3️⃣ Deploy Stage<br/><i>k3s Pod Rollout</i>"]

            SourceStage --> BuildStage --> DeployStage
        end

        subgraph CodeBuildDetails["🛠️ AWS CodeBuild (buildspec.yml)"]
            direction TB
            CB1["Run Maven Tests & Package JARs"]
            CB2["Build Docker Container Images"]
            CB3["Authenticate & Push to Amazon ECR"]
            CB1 --> CB2 --> CB3
        end

        ECR["📦 Amazon ECR<br/><b>Private Container Registry</b>"]

        GitHub -->|Webhook Trigger| SourceStage
        BuildStage --> CodeBuildDetails
        CB3 -->|Push Image| ECR
        DeployStage -->|Rolling Update / kubectl rollout| K3sCluster
        ECR -.->|Pull Latest Image| K3sCluster
    end

    %% ── 5. LOAD TESTING VALIDATION ──
    subgraph LoadTesting["🧪 5. Performance Validation (k6)"]
        K6["📊 k6 Mixed API Workload Testing<br/>• 100 Peak Virtual Users (VUs)<br/>• 0% Failure Rate<br/>• ~480 ms p95 Response Time"]
        K6 -.->|Simulated High Load| ElasticIP
    end

    %% ── STYLING ──
    classDef client fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef aws fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef gateway fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fef3c7;
    classDef svc fill:#172554,stroke:#60a5fa,stroke-width:1.5px,color:#eff6ff;
    classDef db fill:#052e16,stroke:#4ade80,stroke-width:2px,color:#f0fdf4;
    classDef cicd fill:#3b0764,stroke:#c084fc,stroke-width:2px,color:#fae8ff;
    classDef test fill:#422006,stroke:#facc15,stroke-width:2px,color:#fefce8;

    class User,Vercel client;
    class ElasticIP,EC2Host aws;
    class Gateway gateway;
    class UserSvc,JobSvc,MatchingSvc,BrokerSvc,NotifSvc svc;
    class RDS db;
    class GitHub,SourceStage,BuildStage,DeployStage,CB1,CB2,CB3,ECR cicd;
    class K6 test;
```

---

## 2. Core Components: Microservices Breakdown

```mermaid
flowchart LR
    subgraph CoreComponents["CORE COMPONENTS — Microservices Breakdowns"]
        direction TB

        subgraph Row1["Gateway & Core Access"]
            direction LR
            GW["🚪 <b>API Gateway (:9000)</b><br/>• Single Entry Point<br/>• Request Routing<br/>• CORS Handling"]
            USR["👤 <b>User Service (:9001)</b><br/>• User Registration<br/>• JWT Auth Generation<br/>• Admin Approval Flow"]
            JOB["💼 <b>Job Service (:9002)</b><br/>• Job Post Management<br/>• Application Lifecycle<br/>• Capacity Locking"]
        end

        subgraph Row2["Intelligence, Operations & Auditing"]
            direction LR
            MATCH["🎯 <b>Matching Service (:9003)</b><br/>• Skill Coverage Score<br/>• District Compatibility<br/>• Deterministic Engine"]
            BROKER["🤝 <b>Broker Service (:9004)</b><br/>• Offline Worker Management<br/>• Proxy Placements<br/>• Commission Math"]
            NOTIF["🔔 <b>Notification Svc (:9005)</b><br/>• Event Audit Logs<br/>• Simulated Providers<br/>• System Notifications"]
        end

        Row1 --> Row2
    end

    classDef card fill:#0b192c,stroke:#1e3e62,stroke-width:2px,color:#e0e7ff;
    class GW,USR,JOB,MATCH,BROKER,NOTIF card;
```

---

## 3. Dedicated AWS CI/CD Pipeline Flow (Sequence Diagram)

```mermaid
sequenceDiagram
    autonumber
    actor Dev as 👨‍💻 Developer
    participant GH as 🐙 GitHub Repository
    participant CP as 🔄 AWS CodePipeline
    participant CB as 🛠️ AWS CodeBuild
    participant ECR as 📦 Amazon ECR
    participant EC2 as 🖥️ EC2 (k3s Cluster)

    Dev->>GH: git push origin main
    GH->>CP: Webhook triggers pipeline
    Note over CP: Stage 1: Source
    CP->>CP: Pull source artifacts

    Note over CP,CB: Stage 2: Build & Test
    CP->>CB: Launch build environment via buildspec.yml
    CB->>CB: Maven: clean test & package JAR
    CB->>CB: Docker: build microservice images
    CB->>ECR: Docker: login & push tagged images
    ECR-->>CB: Digest confirmed
    CB-->>CP: Build successful

    Note over CP,EC2: Stage 3: Deployment
    CP->>EC2: Trigger Kubernetes rolling update (kubectl apply)
    EC2->>ECR: Pull updated microservice images
    EC2->>EC2: Health checks & zero-downtime pod rollout
    Note over EC2: System running updated version!
```
