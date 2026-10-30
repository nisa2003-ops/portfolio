# Nisadu Nimsitha – CV
**Cloud & DevOps Engineer | Backend & Distributed Systems | Computer Science Undergraduate**
Colombo, Sri Lanka | nisadu2003@gmail.com | [LinkedIn](https://www.linkedin.com/in/nisadu-nimsitha-512a24348) | [GitHub](https://github.com/nisa2003-ops) | [Portfolio](https://nisadu-nimsitha.vercel.app)

---

## Professional Summary
Computer Science undergraduate at the University of Sri Jayewardenepura (GPA 3.31/4.00) focused on cloud infrastructure, DevOps automation and distributed backend systems. Deployed six Spring Boot microservices on AWS EC2 with k3s, Amazon RDS PostgreSQL and AWS CodePipeline CI/CD, load-tested with k6 at 100 concurrent users and 0% failures. Hands-on with Terraform, GitHub Actions (OIDC, Trivy), Prometheus and Grafana.

---

## Technical Skills
- **Cloud & Infrastructure:** AWS (EC2, VPC, ECR, RDS PostgreSQL, CodePipeline, CodeBuild, IAM, S3, KMS), Kubernetes (k3s), Docker, Docker Compose, Linux (Ubuntu, Bash, systemd, SSH)
- **DevOps & CI/CD:** Terraform, GitHub Actions (OIDC, Trivy), AWS CodePipeline, AWS CodeBuild, Jenkins, Maven, Git
- **Backend:** Java, Spring Boot (Spring Security, Spring Data JPA), Python, FastAPI, Node.js, Express, REST APIs, Microservices, JWT Authentication
- **Observability & Testing:** Prometheus, Grafana, k6, pytest, Postman
- **Databases:** PostgreSQL, MySQL, Database Design & ER Modeling
- **Machine Learning & MLOps:** Scikit-learn, XGBoost, MLflow
- **Frontend:** React, Next.js, Vite, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
- **Networking & Security:** TCP/IP, Subnetting (VLSM), OSI Model, Cisco Packet Tracer, VPC Security Groups & NACLs

---

## Education
**University of Sri Jayewardenepura**, Colombo, Sri Lanka | **2024 – Expected 2026**  
*Bachelor of Science (Honours) in Computer Science (Statistics & Mathematics)* | **GPA: 3.31 / 4.00**
- **Coursework:** Service-Oriented Computing, Data Structures & Algorithms, Computer Security, Machine Learning, Database Design & ER Modeling, Net-Centric Computing, Software Quality Assurance, Object-Oriented Programming, Regression Analysis, Inference Statistics

---

## Projects

### **Lanka MicroJob – Distributed Cloud Microservices Platform**
*Spring Boot, React, AWS EC2, k3s, Amazon ECR, AWS CodePipeline, Amazon RDS, k6* | [GitHub](https://github.com/nisa2003-ops/Lanka-Microjob-V1) | [Architecture case study](https://medium.com/@nisadu2003/from-docker-compose-to-kubernetes-on-aws-deploying-lanka-microjob-with-ci-cd-rds-and-load-6bfe6eea0be4) | [Live demo](https://lanka-microjob.vercel.app/)
- Engineered six Spring Boot microservices (API Gateway, User, Job, Matching, Broker, Notification) covering authentication, job placement, commission logic and audit trails
- Containerized the services with Docker and deployed them to a single-node k3s cluster on AWS EC2 using YAML manifests, ClusterIP services, NodePort ingress and an Elastic IP
- Built an AWS CodePipeline and CodeBuild workflow, triggered by GitHub webhooks, that runs Maven tests, builds Docker images, pushes to Amazon ECR and performs rolling updates
- Integrated Amazon RDS PostgreSQL in an isolated VPC subnet with connection pooling; k6 tests sustained 100 peak virtual users with 0% failures and about 480 ms P95 latency
- Resolved CORS preflight issues and JWT propagation through the API Gateway; added health endpoints for Kubernetes liveness and readiness probes

### **CloudOps – Automated Cloud Deployment & Reliability Platform**
*Terraform, AWS (VPC, IAM, EC2, ECR), Docker, GitHub Actions, Prometheus, Grafana, FastAPI, Python*
- Wrote modular Terraform to provision reproducible AWS infrastructure: custom VPCs, public and private subnets, internet gateways, route tables, security groups and Amazon ECR repositories
- Designed a GitHub Actions pipeline using AWS OIDC federation to remove long-lived IAM credentials, with Trivy scans that gate releases on container vulnerabilities
- Instrumented a FastAPI service with Prometheus RED metrics (rate, errors, duration) and latency histograms, and built Grafana dashboards for latency and error tracking
- Added pytest suites to the pre-merge CI workflow and wrote rollback runbooks for deployment regressions

### **Dengue Outbreak Risk Classifier & MLOps Pipeline**
*Python, Scikit-learn, XGBoost, MLflow, FastAPI, GitHub Actions* | [GitHub](https://github.com/nisa2003-ops/Dengue-Risk-MLOps-1)
- Built an end-to-end outbreak risk classifier on historical case counts and weather data, splitting 13,150 training and 2,800 validation records chronologically to prevent target leakage
- Engineered rolling lag features and weather moving averages; compared Logistic Regression, Random Forest and XGBoost, reaching a validation macro F1 of 0.7888 and 0.8437 recall on the high-risk class
- Tracked experiments with MLflow and served the champion model through an asynchronous FastAPI endpoint with automated GitHub Actions tests

### **Lanka Travel Planner – AI-Powered Travel Engine**
*React, Node.js, Express, Google Gemini API, Leaflet, OpenStreetMap* | [GitHub](https://github.com/nisa2003-ops/Lanka-Travel-Planner)
- Built a full-stack planner that generates multi-day Sri Lankan itineraries from destination preferences, budget and traveler profile, with Gemini-generated cost breakdowns and daily schedules
- Rendered interactive route maps with Leaflet and OpenStreetMap, including waypoints and location popups

---

## Experience & Leadership

### **Web Developer & Lead Graphic Designer, CODEXIA 2026**
*Computer Science Association (CSA), University of Sri Jayewardenepura | 2026* | [Event platform](https://codexia-csa.vercel.app/)
- Co-developed the event platform with Next.js, React and Tailwind CSS, including a canvas starfield and mobile-responsive layouts
- Produced the official media kit: promotional campaigns, formal invitations and participant and winner certificates
- Worked with the CSA committee on competition logistics, problem guidelines and technical infrastructure

### **Web Development Team Member, Sathsara Dahana 2026**
*Faculty of Applied Sciences, University of Sri Jayewardenepura | 2026* | [Event platform](https://www.sathsaradahana.live/)
- Built the official portal for the faculty's annual cultural festival with Next.js, React and Tailwind CSS
- Implemented an audition verification system that lets candidates check selection results by index number, plus an HTML5 canvas terminal bootloader and live countdowns

### **Customer Care Executive, Startek**
*Colombo, Sri Lanka*
- Resolved tier-1 technical and customer issues for global enterprise accounts under strict SLAs, using structured root-cause troubleshooting

---

## Certifications
- **AWS Academy Graduate:** [Cloud Foundations (May 2026)](https://www.credly.com/badges/acd4df5d-898e-49c9-8609-7b883f855d70/linked_in_profile), [Cloud Security Foundations (Jul 2026)](https://www.credly.com/badges/0837b3eb-49ed-4e86-a210-a1973df227e6/public_url), [Microservices & CI/CD Pipeline Builder (Aug 2026)](https://www.credly.com/badges/3508f16c-bc97-4ca3-98d1-a0808731e073/public_url), [Cloud Security Builder (Sep 2026)](https://www.credly.com/badges/69c7a723-5514-4544-b8e3-d28712da6f91/public_url)
- **Cisco Networking Academy:** [Networking Basics (Oct 2026)](https://www.credly.com/badges/cf521714-f640-46cc-b75e-948206550a1d/public_url), [Introduction to Packet Tracer (Sep 2026)](https://www.credly.com/badges/2d0be4e4-a562-4b2a-a779-1f2313a7a4e9/public_url)
- **KodeKloud:** [Kubernetes Crash Course (May 2026)](https://learn.kodekloud.com/certificate/8a90819f-6656-4cc5-ba1a-1e0103bd7e66), [Linux for Absolute Beginners (May 2026)](https://learn.kodekloud.com/certificate/16b70d88-49fa-45b6-87ff-315738e5ee4b)
- **In progress:** Linux Essentials (Cisco / LPI), GitOps for Platform Engineering (KodeKloud)
