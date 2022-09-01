resource "google_cloud_run_service" "matching-service" {
  name     = "matching-service"
  location = "asia-southeast1"
  template {
    spec {
      containers {
        image = "gcr.io/cs3219-project-ay2223s1-g22/matching-service:latest"
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Create public access
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

# Enable public access on Cloud Run service
resource "google_cloud_run_service_iam_policy" "noauth-matching-service" {
  location    = google_cloud_run_service.matching-service.location
  project     = google_cloud_run_service.matching-service.project
  service     = google_cloud_run_service.matching-service.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

# Return service URL
output "matching-service-url" {
  value = google_cloud_run_service.matching-service.status[0].url
}