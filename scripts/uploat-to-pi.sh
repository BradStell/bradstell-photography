###########################################################################################################
#######       Shell script using rsync to upload assets to raspberry pi staging environment         #######
###########################################################################################################

# upload all html files
# gsutil cp *.html gs://bradleystell.com
rsync -avh public/*.html raspberrypi.local:/home/brad/bradley-stell-photography

# upload stylesheets
# gsutil cp styles/*.css gs://bradleystell.com/styles
rsync -avh public/styles/* raspberrypi.local:/home/brad/bradley-stell-photography/styles/

# upload js files
# gsutil cp js/*.js gs://bradleystell.com/js
rsync -avh public/js/* raspberrypi.local:/home/brad/bradley-stell-photography/js/

# upload all images
# gsutil cp images gs://bradleystell.com/images
rsync -avh public/images/* raspberrypi.local:/home/brad/bradley-stell-photography/images/
