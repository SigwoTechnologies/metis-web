type ValidateSignatureResponse = {
  verified: boolean;
  job: {
    id: number;
    createdAt: number;
    href: string;
  };
  address: string;
};

export default ValidateSignatureResponse;
