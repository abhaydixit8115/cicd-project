resource "aws_security_group" "dove-sg2" {
  name        = "dove-sg2"
  description = "Allow TLS inbound traffic and all outbound traffic"

  tags = {
    Name = "dove-sg2"
  }
}

resource "aws_vpc_security_group_ingress_rule" "sshfrommyIP" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "152.59.181.113/32"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "allow-http" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_egress_rule" "allowAllOutbound_4" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

resource "aws_vpc_security_group_egress_rule" "allowAllOutbound_6" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}