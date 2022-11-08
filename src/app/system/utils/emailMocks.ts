const { WEB_APP_URL } = process.env;

export default class emailMocks {
  /**
   * Create user account
   * @param {Object} mailOptions Object
   */
  static async verifyAccount(mailOptions) {
    return `
        <div style="width:85%;margin:auto;">
            <p style="font-family: 'Roboto', sans-serif;font-size: 1.2em;font-weight: 400;line-height: 1.55;color: #222222;margin: 10px 0 30px;padding: 44px 34px 44px 34px;background-color: #ffffff;border-radius: 8px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 210, 190, 129);">
                Hi <span>${mailOptions.fullName}</span>,<br><br>
                Welcome to Smart Parkings, the home to engaging and search nearest parking slots!!<br /> <br />
                You have access to parking around the country, you can search parking space of your choice<br />
                animations and learning tips. <br />
                 <a href="${WEB_APP_URL}/activate-account?activation=${mailOptions.token}"><button type="button" style="   border: none;color: white;padding: 10px; text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;background-color: #4CAF50;">Click Here</button></a>
                <br /><br />
                Welcome again! Kindly confirm your registration as soon as possible! <br><br>
                Best,<br>
                <span>Smart Parkings</span> <br><br>
            </p>
        </div>
      `;
  }

  /**
   * Create user account
   * @param {Object} mailData Object
   */
  static async forgetPassword(mailData) {
    const url = `${WEB_APP_URL}/reset-password?token=${mailData.token}`;
    return `
        <div style="width:85%;margin:auto;">
            <p style="font-family: 'Roboto', sans-serif;font-size: 1.2em;font-weight: 400;line-height: 1.55;color: #222222;margin: 10px 0 30px;padding: 44px 34px 44px 34px;background-color: #ffffff;border-radius: 8px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 210, 190, 129);">
               Hello, <br><br>
               No worries humans forget, you are missing in the Smart Parking system :-( <br />
               Straight forward use this link to catch up and create your Smart Parking system experience again <br />
               as usual<br />
               <b style="color:#2E86C1"><a href="${url}" style="color:#4CAF50">click here</a></b><br>
            <strong>NB:</strong><span style="color:OrangeRed">  remember that this link will be expired not too Long </span>
                <br /><br />
                
                Best,<br>
                <span>Smart Parking system</span>
            </p>
        </div>
      `;
  }

}
