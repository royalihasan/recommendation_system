#!/bin/bash
set -e

PROJECT_ID="gen-lang-client-0931701379"
REGION="us-central1"
REPO_NAME="recommendation-system"
SA_NAME="github-actions-deployer"
SA_EMAIL="$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"

echo "🚀 Starting GCP Setup for project: $PROJECT_ID"

# 1. Set Project
echo "👉 Setting GCP Project..."
gcloud config set project $PROJECT_ID

# 2. Enable APIs
echo "👉 Enabling Cloud Run and Artifact Registry APIs..."
gcloud services enable run.googleapis.com artifactregistry.googleapis.com

# 3. Create Artifact Registry
echo "👉 Creating Artifact Registry repository..."
if ! gcloud artifacts repositories describe $REPO_NAME --location=$REGION >/dev/null 2>&1; then
    gcloud artifacts repositories create $REPO_NAME \
        --repository-format=docker \
        --location=$REGION \
        --description="Docker repository for Recommendation System"
else
    echo "   Repository $REPO_NAME already exists."
fi

# 4. Create Service Account
echo "👉 Creating Service Account..."
if ! gcloud iam service-accounts describe $SA_EMAIL >/dev/null 2>&1; then
    gcloud iam service-accounts create $SA_NAME --display-name="GitHub Actions Deployer"
else
    echo "   Service Account $SA_NAME already exists."
fi

# 5. Grant Roles
echo "👉 Granting IAM roles..."
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA_EMAIL" --role="roles/run.admin" >/dev/null
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA_EMAIL" --role="roles/iam.serviceAccountUser" >/dev/null
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA_EMAIL" --role="roles/artifactregistry.writer" >/dev/null

# 6. Create Key
echo "👉 Creating Service Account Key..."
gcloud iam service-accounts keys create gcp-sa-key.json --iam-account=$SA_EMAIL

# 7. Set GitHub Secrets
echo "👉 Setting GitHub Secrets..."
gh secret set GCP_PROJECT_ID --body "$PROJECT_ID"
gh secret set GCP_SA_KEY < gcp-sa-key.json

# 8. Cleanup
echo "👉 Cleaning up..."
rm gcp-sa-key.json

echo "✅ Setup Complete! You can now push to main to deploy."
