import AuthService from '../../services/auth.service';

export default class AuthReceiver {
  private authService: AuthService;

  constructor(_authService: AuthService) {
    this.authService = _authService;
  }

  async getChallenge(address: string): Promise<string> {
    return this.authService.getChallenge(address);
  }

  getChallengeMessage(challenge: string): string {
    return this.authService.getChallengeMessage(challenge);
  }

  async validateSignature(message: string, signature: string) {
    return this.authService.validateSignature(message, signature);
  }
}
