from socket import *

def sendMSG(msg):
    sock = socket()
    sock.connect(("127.0.0.1", 3041))
    sock.sendall(msg+b"\n")
    print(sock.recv(2))
    sock.close()

for f in range(0,1):
    sendMSG(b",Time,04:11:00/28:09:22,Number,5005,Sensors,-3.00,2.31,3.31,0.88,-0.37,-0.75,-1.06,-1.06,-1.06,-2.06,-2.06,-2.06,-3.06,-3.06,-3.06,-4.06,-4.06,-4.06,-3.00,-3.00,-3.00,-2.00,-2.00,-2.00,-1.00,AKB,4.74,")
    sendMSG(b"10")
