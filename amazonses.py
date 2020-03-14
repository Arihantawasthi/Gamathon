import os
import django
import smtplib  
import email.utils
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Gamathon.settings.prod')
django.setup()

from slingshot.models import User, Team
from tourney.models import Tournament, Round, Stage
from organize.models import Notification

tour= Tournament.objects.get(id=9)
stage = Stage.objects.get(stage_name='Quater-Final', tour=tour)
group = Round.objects.get(round_name='Group 1', stage=stage)

g26_dict = {}
g26_teams = group.team.all()
g26_players = group.solo.all()
print(len(g26_players))

for team in g26_teams:
    g26_dict[team.name] = []
    for i in team.members.all():
        if i in g26_players:
            g26_dict[team.name].append(i.email)

# Replace sender@example.com with your "From" address. 
# This address must be verified.
SENDER = 'support@gamathon.gg'  
SENDERNAME = 'Gamathon'


# Replace recipient@example.com with a "To" address. If your account 
# is still in the sandbox, this address must be verified.
RECIPIENTS = g26_dict
print(RECIPIENTS)

c = 0
for recipients, emails in RECIPIENTS.items():
    c += 1
    for em in emails:
        try:
            noti = Notification(user_1=User.objects.get(email=em), update=f'Match info: RoomID: 2538647, Password: PMBC1, Slot No: {c}, Match Start Time: 8:00 PM')
            noti.save()
            print('DONE!')
        except Exception as e:
            print(e)

# Replace smtp_username with your Amazon SES SMTP user name.
USERNAME_SMTP = "AKIA44TG4BCPMQKKZL5M"

# Replace smtp_password with your Amazon SES SMTP password.
PASSWORD_SMTP = "BIxqc9+/qUsLVKv2Aq6ym/CCLXfDOyTlHYCODn8KSI7E"

# (Optional) the name of a configuration set to use for this message.
# If you comment out this line, you also need to remove or comment out
# the "X-SES-CONFIGURATION-SET:" header below.
CONFIGURATION_SET = "GamathonConfig"

# If you're using Amazon SES in an AWS Region other than US West (Oregon), 
# replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP  
# endpoint in the appropriate region.
HOST = "email-smtp.ap-south-1.amazonaws.com"
PORT = 587

# The subject line of the email.
SUBJECT = 'Information Regarding Room ID Password'

BODY_TEXT = """
	Room Id Password
"""
counter = 0
# The HTML body of the email.
for recipient, emails in RECIPIENTS.items():
	counter += 1
	for em in emails:
		BODY_HTML = """<html>
		   <head>
		      <style>
		         .banner-color {{
		         background-color: #fe0000;
		         }}
		         .title-color {{
		         color: #0066cc;
		         }}
		         .button-color {{
		         background-color: #0066cc;
		         }}
		         @media screen and (min-width: 500px) {{
		            .banner-color {{
		            background-color: #fe0000;
		            }}
		            .title-color {{
		            color: #eb681f;
		            }}
		            .button-color {{
		               background-color: #007bff;
		            }}
		         }}
		      </style>
		   </head>
		   <body>
		      <div style="background: linear-gradient(to bottom, rgb(12, 12, 12), #3b3939);padding:0;margin:0 auto;font-weight:200;width:100%!important; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
		         <table align="center" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif;" width="100%">
		            <tbody >
		               <tr>
		                  <td align="center">
		                     <center style="width:100%">
		                        <table border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif" width="512">
		                           <tbody style="background-color: rgb(38, 38, 43); box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);">
		                              <tr>
		                                 <td bgcolor="#F3F3F3" width="100%" style="background-color: rgb(38, 38, 43);padding:12px;border-bottom:1px solid #ececec">
		                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important" width="100%">
		                                       <tbody>
		                                          <tr style="border-top-right-radius: 6px; border-top-left-radius: 6px; box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.5);">
		                                             <td align="left" valign="middle" width="50%"><span style="margin:0;color:white;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">Gamathon</span></td>
		                                             <td valign="middle" width="50%" align="right" style="padding:0 0 0 10px"><span style="margin:0;color:white;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px"></span></td>
		                                             <td width="1">&nbsp;</td>
		                                          </tr>
		                                       </tbody>
		                                    </table>
		                                 </td>
		                              </tr>
		                              <tr style="border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
		                                 <td align="left">
		                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
		                                       <tbody>
		                                          <tr>
		                                             <td width="100%">
		                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
		                                                   <tbody>
		                                                      <tr>
		                                                         <td align="center" bgcolor="#8BC34A" style="background-color:#fe0000;box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); padding:20px 48px;color:#ffffff" class="banner-color">
		                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
		                                                               <tbody>
		                                                                  <tr>
		                                                                     <td align="center" width="100%">
		                                                                        <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px; font-family: Play, sans-serif; border-top-left-radius: 6px; border-top-right-radius: 6px;">Greetings from Gamathon!</h1>
		                                                                     </td>
		                                                                  </tr>
		                                                               </tbody>
		                                                            </table>
		                                                         </td>
		                                                      </tr>
		                                                      <tr>
		                                                         <td align="center" style="padding:20px 0 10px 0">
		                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
		                                                               <tbody>
		                                                                  <tr>
		                                                                     <td align="center" width="100%" style="padding: 0 15px;text-align: justify;color: white;font-size: 12px;line-height: 18px;">
		                                                                        <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center; color: white;" class="title-color">Hey Homie,</h3>
		                                                                        <p style="margin: 20px 0 30px 0;font-size: 15px;text-align: center; color: white;">Room ID: 2538647<br> Password: PMBC1 <br> Match Start Time: 8:00 PM <br> SlotNo: {0} <br><br> Note: Please be seated only in your slot otherwise your team will be kicked out.<br> Don't Share this ID and Password with you friends only registered members all allowed. <br><br> Good Look For the Match Homie!</p>
		                                                                   
		                                                                     </td>
		                                                                  </tr>
		                                                               </tbody>
		                                                            </table>
		                                                         </td>
		                                                      </tr>
		                                                      <tr>
		                                                      </tr>
		                                                      <tr>
		                                                      </tr>
		                                                   </tbody>
		                                                </table>
		                                             </td>
		                                          </tr>
		                                       </tbody>
		                                    </table>
		                                 </td>
		                              </tr>
		                              <tr>
		                                 <td align="left">
		                                    <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(to bottom, rgb(40, 40, 49), rgb(10, 10, 10));padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
		                                       <tbody>
		                                          <tr>
		                                             <td align="center" width="100%">
		                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
		                                                   <tbody>
		                                                      <tr>
		                                                         <td align="center" valign="middle" width="100%" style="border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#white;font-weight:200;font-size:12px;line-height:18px">Regards,
		                                                            <br><b style="color: white;">Gamathon</b>
		                                                         </td>
		                                                      </tr>
		                                                   </tbody>
		                                                </table>
		                                             </td>
		                                          </tr>
		                                          <tr>
		                                             <td align="center" width="100%">
		                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
		                                                   <tbody>
		                                                      <tr>
		                                                         <td align="center" style="padding:0 0 8px 0" width="100%"></td>
		                                                      </tr>
		                                                   </tbody>
		                                                </table>
		                                             </td>
		                                          </tr>
		                                       </tbody>
		                                    </table>
		                                 </td>
		                              </tr>
		                           </tbody>
		                        </table>
		                     </center>
		                  </td>
		               </tr>
		            </tbody  >
		         </table>
		      </div>
		   </body>
		</html>""".format(counter)
		# Create message container - the correct MIME type is multipart/alternative
		msg = MIMEMultipart('alternative')
		msg['Subject'] = SUBJECT
		msg['From'] = email.utils.formataddr((SENDERNAME, SENDER))
		msg['To'] = em
		# Comment or delete the next line if you are not using a configuration set
		msg.add_header('X-SES-CONFIGURATION-SET',CONFIGURATION_SET)

		# Record the MIME types of both parts - text/plain and text/html.
		part1 = MIMEText(BODY_TEXT, 'plain')
		part2 = MIMEText(BODY_HTML, 'html')

		# Attach parts into message container.
		# According to RFC 2046, the last part of a multipart message, in this case
		# the HTML message, is best and preferred.
		msg.attach(part1)
		msg.attach(part2)

		# Try to send the message.
		try:  
		  server = smtplib.SMTP(HOST, PORT)
		  server.ehlo()
		  server.starttls()
		  #stmplib docs recommend calling ehlo() before & after starttls()
		  server.ehlo()
		  server.login(USERNAME_SMTP, PASSWORD_SMTP)
		  server.sendmail(SENDER, em, msg.as_string())
		  server.close()
		# Display an error message if something goes wrong.
		except Exception as e:
		  print (f"Error: {em}", e)
		else:
		  print (f"Email sent to {em}!")
