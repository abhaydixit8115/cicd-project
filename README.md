### **1. Run the Machine Using Terraform**

- **Command:**

  ```bash
  terraform apply
  ```

  **Explanation:**

  - This command applies the Terraform configuration and provisions the machine according to the configuration defined in `.tf` files.

---

### **2. Install Docker**

#### **2.1 Remove Old Docker Packages**

- **Command:**

  ```bash
  for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
  ```

  **Explanation:**

  - This command removes old or conflicting Docker-related packages that might interfere with the installation of the latest version of Docker.

#### **2.2 Add Docker's GPG Key**

- **Command:**

  ```bash
  sudo apt-get update
  sudo apt-get install ca-certificates curl
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc
  ```

  **Explanation:**

  - Updates the system, installs necessary tools (`ca-certificates`, `curl`), creates a keyring directory, downloads Docker's GPG key, and sets permissions to allow the system to use this key for verifying Docker packages.

#### **2.3 Add Docker Repository**

- **Command:**

  ```bash
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  ```

  **Explanation:**

  - Adds Docker’s official APT repository to the system's list of repositories to enable the installation of Docker packages from Docker’s source.

#### **2.4 Install Docker Packages**

- **Command:**

  ```bash
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  ```

  **Explanation:**

  - Updates the package list and installs Docker Engine (`docker-ce`), Docker CLI (`docker-ce-cli`), container runtime (`containerd.io`), and Docker Compose plugins.

#### **2.5 Provide Permissions to Docker Socket**

- **Command:**

  ```bash
  sudo chmod 777 /var/run/docker.sock
  ```

  **Explanation:**

  - Grants read, write, and execute permissions to the Docker socket, allowing non-root users to interact with Docker.

#### **2.6 Add User to Docker Group**

- **Command:**

  ```bash
  sudo usermod -aG docker $USER && newgrp docker
  ```

  **Explanation:**

  - Adds the current user to the Docker group to avoid needing `sudo` for running Docker commands and refreshes the group membership without logging out.

#### **2.7 Verify Docker Installation**

- **Command:**

  ```bash
  docker ps
  ```

  **Explanation:**

  - Lists the currently running Docker containers. It’s a simple way to check if Docker is running properly.

---

### **3. Install Jenkins**

#### **3.1 Install Dependencies**

- **Command:**

  ```bash
  sudo apt update -y
  sudo apt install fontconfig openjdk-17-jre -y
  ```

  **Explanation:**

  - Updates the system and installs dependencies like `fontconfig` and `openjdk-17-jre` required to run Jenkins.

#### **3.2 Add Jenkins GPG Key**

- **Command:**

  ```bash
  sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
  ```

  **Explanation:**

  - Downloads and saves Jenkins’ GPG key used for verifying the authenticity of Jenkins packages.

#### **3.3 Add Jenkins Repository**

- **Command:**

  ```bash
  echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
  ```

  **Explanation:**

  - Adds Jenkins' official repository to the system’s APT sources list, so you can install Jenkins from the official repository.

#### **3.4 Install Jenkins**

- **Command:**

  ```bash
  sudo apt-get update -y
  sudo apt-get install jenkins -y
  ```

  **Explanation:**

  - Updates the APT package list and installs Jenkins.

#### **3.5 Start Jenkins**

- **Command:**

  ```bash
  sudo systemctl start jenkins
  ```

  **Explanation:**

  - Starts the Jenkins service after installation.

#### **3.6 Verify Jenkins Installation**

- **Command:**

  ```
  http://<your-server-ip>:8080
  ```

  **Explanation:**

  - Access Jenkins via the web browser using the default port `8080` to ensure it’s running properly.
