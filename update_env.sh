#! /bin/sh
file=.env1
MAIL_FROM=$1
MAIL_TO=$2
MAILGUN_API_KEY=$3
MAILGUN_DOMAIN=$4

sed -i 's/mail-id/'$MAIL_FROM'/g' $file
sed -i 's/comma, separated, mail, ids/'$MAIL_TO'/g' $file
sed -i 's/private-api-key/'$MAILGUN_API_KEY'/g' $file
sed -i 's/mailgun-domain/'$MAILGUN_DOMAIN'/g' $file

# Command to update the values from Github Actions using Secrets:
# ./update_env.sh ${{ secrets.MAIL_FROM }} ${{ secrets.MAIL_TO }} ${{ secrets.MAILGUN_API_KEY }} ${{ secrets.MAILGUN_DOMAIN }}