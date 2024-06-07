import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Input } from "../Input";
import { Select } from "../Select";
import { RTE } from "../Logo";
import Service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, cantrol, getValues } =
    useForm({
      defaultvalue: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                Service.deleteFile(post.featuredImage);
            }

            const dbPost = await Service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await Service.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await Service.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };


    const userData = useSelector((state) => state.auth.userData);
  return <div></div>;
};

export default PostForm;
