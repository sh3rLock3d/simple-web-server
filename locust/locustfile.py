import time
import random
from locust import HttpUser, task, between
import json

myheaders = {'Content-Type': 'application/json'}
class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def view_(self):
        for item_id in range(10):
            if bool(random.getrandbits(1)):
                a = "http://localhost:3000/nodejs/write?line=" + str(random.randint(2, 90))
                self.client.get(a)
                time.sleep(1)
            else:
                data = "{first-num:5,second-num:7}"
                data = [{
                    "first-num":random.randint(1,100),
                    "second-num":random.randint(1,100)
                }]
                self.client.post("http://localhost:3000/nodejs/sha256", data=json.dumps(data), headers=myheaders)
                time.sleep(1)
