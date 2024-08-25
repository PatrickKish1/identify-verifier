import React, { useState } from 'react';
import getWeb3 from '../utils/web3';
import IdentityVerifier from '../contracts/IdentityVerifier.json';

const Register = () => {
  const [ipfsHash, setIpfsHash] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const handleRegister = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.registerIdentity(ipfsHash).send({ from: accounts[0] });
    alert('Registration successful');
  };

  React.useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      setWeb3(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = IdentityVerifier.networks[networkId];
      const instance = new web3.eth.Contract(
        IdentityVerifier.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(instance);
    };
    init();
  }, []);

  return (
    <div>
      <h2>Register Identity</h2>
      <input
        type="text"
        placeholder="IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
