import os
import subprocess
import time

print("======================================================")
print("  Creating a secure public link for Khushi...")
print("======================================================")

# Use serveo.net for free port forwarding via SSH
# It requires no installation, just an SSH client (built into Windows 10/11)
cmd = "ssh -R 80:localhost:8888 serveo.net"

try:
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    
    # Read the output to find the URL
    url = None
    for line in iter(process.stdout.readline, ''):
        line = line.strip()
        print(f"[{line}]")
        if "Forwarding HTTP traffic" in line:
            url = line.split("from")[-1].strip()
            print("\n======================================================")
            print(f"  SUCCESS! Send this exact link to Khushi:")
            print(f"  {url}")
            print("======================================================")
            break
            
    # Keep running
    while True:
        time.sleep(1)
        
except KeyboardInterrupt:
    print("\nClosing tunnel...")
    process.terminate()
except Exception as e:
    print(f"Error: {e}")
