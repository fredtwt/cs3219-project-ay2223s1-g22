variable "GCP_KEY" { }
variable "matching-service_image_tag" {
	type=string
	default="latest"
}
variable "frontend_image_tag" {
	type=string
	default="latest"
}