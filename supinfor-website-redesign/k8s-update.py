import requests
import json
import sys

host = "http://192.168.224.100:8001/apis/"


def update_image(deploy_name="", namespace="supinfor", container_name="", image_name=""):
    api_url_ = "{}apps/v1/namespaces/{}/deployments/{}".format(
        host, namespace, deploy_name
    )
    print(api_url_)

    headers = {
        "Content-Type": "application/strategic-merge-patch+json",
    }
    _data = {
        "spec": {
            "template": {
                "spec": {
                    "containers": [
                        {
                            "name": container_name,
                            "image": image_name,
                        }
                    ]
                }
            }
        }
    }

    # resp = requests.patch(api_url_, data=json.dumps(_data,), headers=headers)
    resp = requests.patch(api_url_, data=json.dumps(_data), headers=headers)
    print(resp.text)

    if resp.status_code != 200 and resp.status_code != 201:
        raise Exception("Kubernetes Update Error. {}".format(resp.text))
    else:
        print("update k8s finished")


if __name__ == "__main__":
    # update_deploy('router4-weibo-comment-zc', data={'spec': {"replicas": 5}})
    if len(sys.argv) != 3:
        print("use: python [branch_name] [image_name] to update k8s")
        sys.exit(1)
    print(sys.argv)
    # dev
    # python k8s-update.py dev image-name
    branch_name = sys.argv[1]
    if branch_name != "master":
        deploy_suffix = "-" + branch_name
    else:
        deploy_suffix = ""
    update_image(
        "supinfor-website{}".format(deploy_suffix),
        container_name="supinfor-website{}".format(deploy_suffix),
        image_name=sys.argv[-1],
    )
