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

resource "aws_vpc_security_group_ingress_rule" "allow-https" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

resource "aws_vpc_security_group_ingress_rule" "allow-smtp" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 25
  ip_protocol       = "tcp"
  to_port           = 25
}

resource "aws_vpc_security_group_ingress_rule" "allow-smtps" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 465
  ip_protocol       = "tcp"
  to_port           = 465
}

resource "aws_vpc_security_group_ingress_rule" "allow-redis" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 6379
  ip_protocol       = "tcp"
  to_port           = 6379
}

resource "aws_vpc_security_group_ingress_rule" "allow-custom-3000-10000" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 3000
  ip_protocol       = "tcp"
  to_port           = 10000
}

resource "aws_vpc_security_group_ingress_rule" "allow-custom-30000-32767" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 30000
  ip_protocol       = "tcp"
  to_port           = 32767
}

resource "aws_vpc_security_group_ingress_rule" "allow-custom-6443" {
  security_group_id = aws_security_group.dove-sg2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 6443
  ip_protocol       = "tcp"
  to_port           = 6443
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
