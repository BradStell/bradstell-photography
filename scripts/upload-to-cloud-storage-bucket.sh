############################################################################################
#######       Shell script using gcloud cli to upload assets to cloud bucket         #######
############################################################################################
cd ./public/

# upload all html files
# look into the -m flag
gsutil cp *.html gs://bradleystell.com

# upload stylesheets
gsutil cp styles/*.css gs://bradleystell.com/styles

# upload js files
gsutil cp js/*.js gs://bradleystell.com/js

# upload all images
# gsutil cp images gs://bradleystell.com/images

cd ..
