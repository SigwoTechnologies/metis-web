enum LoginError {
  InvalidSignature,
  RequiredAddress,
  RequiredChallenge,
  RequiredChallengeMessage,
  RequiredCredentials,
  RequiredPassword,
  RequiredPassphrase,
  RequiredPrivateKey,
  RequiredPublicKey,
  DifferentFlow,
}

export default LoginError;
