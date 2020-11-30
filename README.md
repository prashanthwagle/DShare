# DShare

## A Peer-to-Peer Highly Secure Communication System

### Definition and Meaning
P2P stands for “Peer to Peer”.
It is a decentralized communication system.
In a P2P network, the "peers" are computer systems which are connected to each other via the Internet or a private network connection without the need of a centralized server.
Decentralized Computing: Decentralized computing is the allocation of resources, both hardware and software, to each individual workstation, or office location. In contrast, centralized computing exists when the majority of functions are carried out, or obtained from a remote centralized location.

### Importance of Decentralization
The potential problems of a centralised communication systems are:
Servers Can Go Down
Servers Can Be Hacked
Companies Throttle or Censor Data
Companies Monetize Your Data


### Our System
Individual Nodes which connect with each Other:
<ul>
<li>Computers with no connectivity connect to the “peers”
<li>Recognize devices that are “Up”.
<li>Device that connect to the already established network get a copy of the conversation.
</ul>
  
Communication: Send
<ul>
<li>A message sent by one computer will be broadcasted to all computers in the network.
<li>Will take place by GET request of the HTTP protocol. 
</ul>

CommunicationL Receive
<ul>
<li>All computers connected to the network will receive the message sent by the sender.
<li>The contents of the conversation will be updated.
</ul>


### Working
After the establishment of a p2p network connection, if a node wants to broadcast a message to other
Peers, it will do so via the HTTP GET request through any browser.
As soon as message is received by every node, the “message box” i.e. text file of every node is updated.
The updated message box is distinctively recognised from the outdated message box by the “Hash” of the 
Message box  by the hashing algorithm i.e. the hash of the updated message box will be changed.
Every node here behaves as a server and the server programming i.e. backend is done using Node.js








### Created by sarangparikh22 and prashanthw360.
