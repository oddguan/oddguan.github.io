---
title: Preparation for the CKA Exam 01
date: Mon Jun 29 23:31:30 EDT 2020
---

## Etcd
Etcd is a key-value store that runs on the master node, which stores cluster information in a key-value fashion.

### Basic Etcd operations
1. Download Etcd from github, extract it and run locally
```sh
./etcd
```
This command will start the etcd server at the port 2379 by default.

2. Interact with Etcd through the `etcdctl` cli. For example: 
    * set a key value pair by running `etcdctl set key1 value1`
    * retrieve the value of a key by running `etcdctl get key1`
    * to get some help, just run `etcdctl` without any arguments.

3. One can set the API version of the etcdctl by setting the env var `ETCDCTL_API`. For example, setting it by doing `export ETCDCTL_API=3` will use version 3 of the API. 

## Kube-Scheduler
The Kube-scheduler decides what pod should go to what worker node. However, keep in mind that the kube-scheduler only **decides** where should the pod go, but it is the kube-apiserver that actually talks to the kubelet in order to actually deploy that pod on the corresponding worker node. 

What is the process of a kube-scheduler determining the schedule of a pod?
1. Filter Nodes. The scheduler filters all worker nodes based on the requirement of the pod, e.g. number of cpus, amount of rams, etc.
2. Rank Nodes. The scheduler then ranks all qualified worker nodes by a ranking algorithm (can be customized). 