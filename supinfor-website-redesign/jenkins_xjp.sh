#!/bin/bash
# 生成镜像版本
image_num=${GIT_LOCAL_BRANCH}_${BUILD_NUMBER}_new
echo "镜像版本为: ${image_num}" >&2

# 将构建版本写入到文件
echo "$image_num" > .build_version

# 拼接镜像名
image_name=registry-intl.ap-southeast-1.aliyuncs.com/supinfor/${JOB_NAME}:${image_num}
image_name_vpc=registry-intl-vpc.ap-southeast-1.aliyuncs.com/supinfor/${JOB_NAME}:${image_num}
echo "镜像名为: ${image_name}" >&2

# docker登录
stime=$(date "+%s")
echo "[start] 开始docker登录" >&2
docker login registry-intl.ap-southeast-1.aliyuncs.com -u support@supinfor.com -p supinforGC1990@
echo "[end] docker登录完成 use_time: "$(expr $(date "+%s") - $stime)"s" >&2

# 打包镜像
stime=$(date "+%s")
echo "[start] 开始打包镜像" >&2
cp config/config-xjp.js config.js
docker build -t ${image_name} .
build_result=$?
if [ $build_result -ne 0 ]; then
    cat <<EOF
===========
Image Build Error
===========
EOF
    exit 10
fi
current_time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[end] 打包镜像完成 use_time: "$(expr $(date "+%s") - $stime)"s" >&2

# 将镜像推送到镜像库
stime=$(date "+%s")
echo "[start] 开始将镜像推送到镜像库" >&2
docker push ${image_name}
push_result=$?
if [ $push_result -ne 0 ]; then
    cat <<EOF
===========
Image Push Error
===========
EOF
    exit 10
fi
current_time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[end] 将镜像推送到镜像库完成 use_time: "$(expr $(date "+%s") - $stime)"s" >&2

# 删除本地镜像
stime=$(date "+%s")
echo "[start] 开始删除本地镜像" >&2
docker rmi "${image_name}"
rm_image_result=$?

if [ $rm_image_result -ne 0 ]; then
    cat <<EOF
================
Image Clean Error
================
EOF
    exit 20;
fi
echo "[end] 删除本地镜像完成 use_time: "$(expr $(date "+%s") - $stime)"s" >&2

# 推送到k8s
stime=$(date "+%s")
echo "[start] 开始推送到k8s" >&2
python k8s-update-xjp.py ${GIT_LOCAL_BRANCH} ${image_name_vpc}
update_k8s=$?
if [ $update_k8s -ne 0 ]; then
    cat <<EOF
================
Kubernetes Update Error
================
EOF
    exit 10
fi
current_time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[end] 推送到k8s完成 use_time: "$(expr $(date "+%s") - $stime)"s" >&2
