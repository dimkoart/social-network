class MailService {

  public updateProfileNotify(email: string): string {
    return `Message was send to ${email}`
  }
}
module.exports = new MailService();