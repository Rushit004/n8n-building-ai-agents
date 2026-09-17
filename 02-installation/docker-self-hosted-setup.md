# Setting Up Self-Hosted n8n Using Docker

## 🎯 Objective
This doc covers the actual steps to run n8n locally using Docker — the recommended way to self-host, since it avoids OS-level compatibility issues and keeps everything in an isolated, disposable container.

## 📚 Concepts Covered
- Why Docker is the recommended self-hosting method
- Prerequisites
- The core Docker run command
- Persisting data with volumes
- Accessing and stopping the instance

## 🧠 Concept Explanations

### Why Docker
**Definition:** Docker packages n8n and everything it needs (runtime, dependencies) into a single container, so it runs identically regardless of the host operating system.
**Why it matters:** It avoids compatibility issues, keeps the install clean and removable, and makes moving the setup to a different machine or server trivial.
**Simple explanation:** Instead of installing n8n directly on your system, you run it inside a self-contained box that already has everything it needs.

### Prerequisites
**Definition:** Docker Desktop (Mac/Windows) or Docker Engine + Docker Compose (Linux) must be installed before running any n8n container.
**Why it matters:** Without Docker itself installed, none of the following commands will work.
**Practical example:** Verifying the install with `docker --version` in a terminal before proceeding.

### The Core Docker Run Command
**Definition:** A single command that creates a storage volume, downloads the n8n image, and starts the container.
**Simple explanation:** Two steps — create a place for data to live, then start n8n pointing at that place.
**Practical example:**
```bash
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```
- `docker volume create n8n_data` — creates a persistent storage volume named `n8n_data`
- `-p 5678:5678` — exposes n8n on port 5678 so it's reachable in the browser
- `-v n8n_data:/home/node/.n8n` — mounts the volume so workflows, credentials, and the encryption key survive container restarts
- `--rm` — removes the container when stopped (the data itself still persists in the volume)

### Persisting Data with Volumes
**Definition:** A Docker volume is storage that lives outside the container's own filesystem, so it isn't wiped when the container stops or is removed.
**Why it matters:** Without a mounted volume, restarting or removing the container would wipe every workflow and credential along with it.
**Simple explanation:** The container is disposable; the volume is not — that separation is what makes Docker safe to restart or upgrade without losing data.

### Accessing and Stopping the Instance
**Definition:** Once running, n8n is reached through a browser at the exposed port; stopping it is just stopping the container.
**Practical example:** Opening `http://localhost:5678` in a browser to reach the editor. Stopping with `Ctrl+C` in the terminal (since `--rm` was used) cleanly removes the container while the `n8n_data` volume remains intact for next time.

## 📌 Key Points
- Docker is n8n's officially recommended self-hosting method
- The default port is 5678, and the default local URL is `http://localhost:5678`
- By default, n8n uses SQLite for storage; PostgreSQL is supported for larger/production setups
- Mounting the `/home/node/.n8n` path to a volume is critical — it holds the encryption key for saved credentials, not just workflow data
- Self-hosting is recommended for users comfortable with servers and containers; mistakes here can cause real data loss, unlike the fully managed Cloud trial

## 🌍 Real-World Applications
- Running n8n locally for development and learning without any Cloud subscription
- Self-hosting on a personal VPS for continuous automation once the free trial ends
- Using Docker Compose (an extension of this same approach) to run n8n alongside a PostgreSQL database for production use

## 🔗 Related Topics
- **Previous:** Free trial vs platform hosting
- **Next:** How data flows in n8n

## ✅ Summary
Docker is the recommended way to self-host n8n because it isolates the app from OS-specific issues and keeps setup reproducible. The core workflow is: create a persistent volume, then run the n8n image with that volume mounted to `/home/node/.n8n` and the port exposed on 5678 — the volume is what keeps workflows, credentials, and the encryption key safe across restarts. This is the natural next step once trial-based learning outgrows the temporary Cloud instance.