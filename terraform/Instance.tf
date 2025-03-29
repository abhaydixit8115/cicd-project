resource "aws_instance" "web" {
  ami                    = data.aws_ami.amiID.id
  instance_type          = "t2.large"
  key_name               = "dove-key2"  # Ensure this key exists in AWS EC2
  vpc_security_group_ids = [aws_security_group.dove-sg2.id]

  tags = {
    Name    = "HelloWorld"
    Project = "Dove"
  }
  root_block_device{
    volume_size = 30
    volume_type = "gp3"
  }
  # 🔹 SSH Connection Configuration
  connection {
    type        = "ssh"
    user        = "ubuntu"  # Use "ec2-user" for Amazon Linux AMI
    private_key = file("${path.module}/dove-key")  # Reference private key in the same directory
    host        = self.public_ip
  }

  # 🔹 Provisioner to copy the script
  provisioner "file" {
    source      = "web.sh"
    destination = "/home/ubuntu/web.sh"
  }

  # 🔹 Provisioner to execute the script
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/web.sh",
      "sudo /home/ubuntu/web.sh"
    ]
  }
}

# Output the public IP
output "instance_public_ip" {
  value = aws_instance.web.public_ip
}

# Save public IP to a file
resource "null_resource" "save_public_ip" {
  provisioner "local-exec" {
    command = "echo ${aws_instance.web.public_ip} > public_ip.txt"
  }

  depends_on = [aws_instance.web]
}
