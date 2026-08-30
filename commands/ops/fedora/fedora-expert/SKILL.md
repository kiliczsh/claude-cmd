---
allowed-tools: Task, Read, Write, Bash(*), Grep, Edit
name: "Fedora Expert"
description: "Comprehensive Fedora Linux expertise with instant parallel analysis"
author: "wcygan"
tags: ["ops","fedora"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Fedora Version: !`cat /etc/fedora-release 2>/dev/null || echo "Not Fedora"`
- Kernel: !`uname -r`
- SELinux Status: !`getenforce 2>/dev/null || echo "No SELinux"`

## Your task

Provide expert Fedora Linux assistance by leveraging comprehensive knowledge across all system domains.

**IF topic is broad or unspecified:**
DEPLOY 10 PARALLEL AGENTS for instant comprehensive analysis:

1. **Package Management Expert**: DNF5, RPM, COPR, Flatpak, repository management
2. **Security Specialist**: SELinux, firewalld, audit system, hardening, CVE analysis
3. **System Administration**: User/group management, systemd, automation, backups
4. **Performance Engineer**: Monitoring, profiling, cgroups v2, tuning, optimization
5. **Troubleshooting Expert**: Debugging, recovery, logs, common issues, solutions
6. **Development Platform**: Compilers, build systems, containers, language toolchains
7. **Network Specialist**: NetworkManager, firewall rules, connectivity, DNS
8. **Storage Expert**: Btrfs, LVM, disk management, quotas, snapshots
9. **Boot/Kernel Expert**: GRUB, initramfs, kernel modules, parameters
10. **Integration Specialist**: Hardware support, virtualization, containers

**ELSE for specific topics:**
Focus expertise on the requested area with deep knowledge.

## Fedora Expertise Knowledge Base

### Package Management (DNF5)

```bash
# Essential DNF5 Commands
dnf search <package>              # Search for packages
dnf info <package>                # Show package details
sudo dnf install <package>        # Install package
sudo dnf remove <package>         # Remove package
sudo dnf update                   # Update all packages
sudo dnf upgrade --refresh        # Force metadata refresh and upgrade
dnf history                       # View transaction history
dnf history info <id>             # Details of specific transaction
sudo dnf history undo <id>        # Undo transaction
dnf repoquery --depends <pkg>     # Show dependencies
dnf repoquery --whatrequires <pkg> # Reverse dependencies
dnf provides <file>               # Find package providing file

# Repository Management
dnf repolist                      # List repositories
sudo dnf config-manager --add-repo <url>  # Add repository
sudo dnf copr enable <user/project>        # Enable COPR repo
dnf repository-packages <repo> list        # List repo packages

# Groups and Modules
dnf group list                    # List available groups
sudo dnf group install "Development Tools"
dnf module list                   # List modules
sudo dnf module enable nodejs:18  # Enable module stream
```

### SELinux Management

```bash
# Status and Modes
getenforce                        # Current mode
sudo setenforce 0|1               # Set permissive|enforcing
sestatus -v                       # Detailed status

# Context Management
ls -Z                            # View contexts
sudo restorecon -Rv /path        # Restore contexts
sudo semanage fcontext -a -t httpd_sys_content_t "/web(/.*)?"
sudo chcon -t httpd_sys_content_t /var/www/html/file

# Troubleshooting
sudo ausearch -m avc -ts recent  # Recent denials
sudo audit2allow -a              # Generate policy from denials
sudo audit2allow -a -M mymodule  # Create policy module
sudo semodule -i mymodule.pp     # Install policy

# Booleans
getsebool -a | grep httpd        # List booleans
sudo setsebool -P httpd_can_network_connect on
```

### System Administration

```bash
# User Management
sudo useradd -m -s /bin/bash -G wheel username
sudo usermod -aG docker username
sudo passwd username
sudo userdel -r username         # Delete with home dir

# Service Management
systemctl status <service>
sudo systemctl start|stop|restart|enable|disable <service>
systemctl list-units --type=service --state=running
systemctl list-unit-files --type=service
journalctl -u <service> -f       # Follow service logs
systemctl daemon-reload          # Reload unit files

# System Updates
sudo dnf upgrade --refresh
sudo dnf system-upgrade download --releasever=43
sudo dnf system-upgrade reboot
sudo dnf autoremove
sudo dnf clean all
```

### Performance & Monitoring

```bash
# System Monitoring
top -c                           # Process monitor
htop                             # Better process monitor
iotop -o                         # I/O monitor
iftop                            # Network monitor
vmstat 1                         # Virtual memory stats
iostat -x 1                      # I/O statistics
sar -u 1 10                      # CPU usage
ss -tunlp                        # Network connections

# Performance Analysis
perf top                         # Real-time CPU profiling
perf record -g <command>         # Record performance
perf report                      # Analyze recording
systemd-analyze                  # Boot performance
systemd-analyze blame            # Service startup times
systemd-analyze critical-chain   # Boot critical path

# Resource Control (cgroups v2)
systemctl set-property <service> CPUQuota=50%
systemctl set-property <service> MemoryMax=1G
systemd-cgls                     # Show cgroup tree
systemd-cgtop                    # Top for cgroups
```

### Troubleshooting

```bash
# System Logs
journalctl -b                    # Current boot logs
journalctl -b -1                 # Previous boot
journalctl -p err               # Error messages only
journalctl --since "1 hour ago"
journalctl -u NetworkManager     # Service logs
dmesg | grep -i error            # Kernel messages

# Recovery
systemctl emergency              # Emergency mode
systemctl rescue                 # Rescue mode
# At boot: add 'rd.break' for initramfs shell
# At boot: add 'single' for single user mode
# At boot: add 'enforcing=0' for SELinux permissive

# Package Issues
sudo dnf distro-sync             # Sync to repository state
sudo rpm --rebuilddb             # Rebuild RPM database
sudo dnf remove --duplicates     # Remove duplicate packages
sudo package-cleanup --problems  # Find problems
```

### Security Hardening

```bash
# Firewall Management
sudo firewall-cmd --list-all
sudo firewall-cmd --add-service=https --permanent
sudo firewall-cmd --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" accept'

# Audit System
sudo auditctl -l                 # List rules
sudo aureport --summary          # Summary report
sudo ausearch -f /etc/passwd     # File access audit
sudo aureport --failed           # Failed events

# Security Tools
sudo dnf install aide            # File integrity
sudo aide --init                 # Initialize database
sudo aide --check                # Check integrity
sudo rkhunter --check            # Rootkit scanner
sudo clamscan -r /              # Antivirus scan
```

### Development Environment

```bash
# Compiler Installation
sudo dnf groupinstall "Development Tools"
sudo dnf install gcc-c++ clang rust cargo golang

# Build Tools
sudo dnf install mock fedpkg koji
mock -r fedora-42-x86_64 --rebuild package.src.rpm
fedpkg build                     # Build in Koji

# Container Tools
sudo dnf install podman buildah skopeo
podman run -it fedora:latest
buildah from fedora:latest
podman build -t myimage .
```

### Network Configuration

```bash
# NetworkManager
nmcli device status              # Device status
nmcli connection show            # List connections
nmcli connection up <name>       # Activate connection
nmcli device wifi list           # List WiFi networks
nmcli device wifi connect <SSID> password <password>

# DNS Configuration
resolvectl status                # DNS resolver status
sudo nmcli connection modify <conn> ipv4.dns "8.8.8.8 8.8.4.4"
sudo nmcli connection modify <conn> ipv4.ignore-auto-dns yes
```

### Common Issues & Solutions

**DNF Errors:**

```bash
# Metadata errors
sudo dnf clean metadata
sudo dnf makecache

# GPG errors
sudo dnf update --nogpgcheck    # Temporary bypass
sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-*

# Transaction errors
sudo dnf history undo last
sudo dnf distro-sync
```

**SELinux Denials:**

```bash
# Generate custom policy
sudo ausearch -m avc -ts recent | audit2allow -M myfix
sudo semodule -i myfix.pp

# Common fixes
sudo setsebool -P httpd_can_network_connect on
sudo setsebool -P httpd_enable_homedirs on
```

**Boot Issues:**

```bash
# Regenerate initramfs
sudo dracut --regenerate-all --force

# Fix GRUB
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
sudo grub2-install /dev/sda     # Legacy BIOS
```

### Fedora-Specific Features

**COPR Repositories:**

```bash
sudo dnf copr enable user/project
sudo dnf copr list --enabled
sudo dnf copr remove user/project
```

**Modularity:**

```bash
dnf module list
sudo dnf module enable postgresql:15
sudo dnf module switch-to postgresql:15
sudo dnf module reset postgresql
```

**Silverblue/Kinoite (Immutable):**

```bash
rpm-ostree status
rpm-ostree upgrade
rpm-ostree install <package>
rpm-ostree override remove <package>
```

### Quick Reference Paths

- `/etc/dnf/dnf.conf` - DNF configuration
- `/etc/yum.repos.d/` - Repository definitions
- `/etc/selinux/config` - SELinux configuration
- `/var/log/dnf5.log` - DNF transaction log
- `/etc/systemd/system/` - Custom service files
- `/usr/lib/systemd/system/` - System service files
- `/etc/NetworkManager/system-connections/` - Network profiles

### Emergency Commands

```bash
# Reset root password
# 1. Boot, press 'e' at GRUB
# 2. Add 'rd.break' to kernel line
# 3. Ctrl+X to boot
chroot /sysroot
passwd root
touch /.autorelabel
exit
reboot

# Fix broken system
sudo dnf distro-sync
sudo dnf reinstall \*
sudo rpm -Va                     # Verify all packages
```

PROVIDE:

1. Specific solutions for user's Fedora issue
2. Commands with explanations
3. Best practices for the task
4. Alternative approaches if applicable
5. Links to relevant Fedora documentation when helpful

Remember: Fedora uses cutting-edge packages, so always consider version-specific differences.