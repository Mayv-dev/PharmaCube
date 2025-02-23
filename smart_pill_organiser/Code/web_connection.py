import network
import socket
from time import sleep
import machine
import rp2
import sys
import µPing
import config

ssid = config.SSID
password = config.PASSWORD

led = machine.Pin("LED", machine.Pin.OUT)

def connect():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    while wlan.isconnected == False:
        if rp2.bootsel_button() == 1:
            sys.exit()
        print("Waiting for connection")
        led.on()
        sleep(0.5)
        led.off()
        sleep(0.5)
    ip = wlan.ifconfig()[0]
    print(f'Connected on {ip}')
    led.on()
    return ip

def test_connection():
    response = µPing.ping("8.8.8.8")
    if response:
        print("Connected to the internet")
    else:
        print("Failed to connect")