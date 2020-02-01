## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [ ] What is the purpose of using _sessions_?

To store user preferences, or authorization. 

- [ ] What does bcrypt do to help us store passwords in a secure manner.

It hashes the passwords one-way such that the string cannot be reversed even if the db has been compromised. 

- [ ] What does bcrypt do to slow down attackers?

Salting, rehashing the password repeatedly to create a time c omplexity: ie. to make it take so long for hackers to brute force the password that it's not worth it. 

- [ ] What are the three parts of the JSON Web Token?

Payload, Secret, Options(or configuration). 

The payload contains information determining AuthZ, the secret is the key that's normally stored in environmental variables on the backend to decipher the jwt. Options can configure things suhc as expiration time of the token. 