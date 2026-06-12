"use client"
import { useEffect, useRef } from "react";
import { Box, Avatar, Typography, IconButton, CircularProgress, Divider } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useAppDispach, useAppSelector } from "@/hooks/store.hooks";
import { getMyProfile, uploadProfilePhoto } from "@/store/features/profile.slice";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";

export default function ProfilePage() {
    const dispatch = useAppDispach();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user, loading, uploadLoading } = useAppSelector((state) => state.profileReducer);

    useEffect(() => {
        const token = getCookie("token");
        if (!token) { router.push("/login"); return; }
        dispatch(getMyProfile());
    }, []);

    function handlePhotoClick() {
        fileInputRef.current?.click();
    }

    async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("photo", file);
        dispatch(uploadProfilePhoto(formData));
    }

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress color="primary" />
        </Box>
    );

    return (
        <Box sx={{ background: "#F1F1F1", minHeight: "100vh", paddingTop: "60px" }}>
            {/* Cover */}
            <Box sx={{
                width: "100%",
                height: { xs: "150px", md: "220px" },
                backgroundColor: "#e0e0e0",
                position: "relative"
            }} />

            {/* Profile Info */}
            <Box sx={{
                width: { xs: "300px", sm: "400px", md: "500px", lg: "700px" },
                mx: "auto",
                mt: 2
            }}>
                {/* Avatar */}
                <Box sx={{ position: "relative", display: "inline-block", mt: "-60px", ml: 2 }}>
                    <Avatar
                        src={user?.photo}
                        alt={user?.name}
                        sx={{ width: 110, height: 110, border: "4px solid #fff" }}
                    />
                    <IconButton
                        onClick={handlePhotoClick}
                        disabled={uploadLoading}
                        sx={{
                            position: "absolute", bottom: 0, right: 0,
                            backgroundColor: "#F63049", color: "#fff",
                            width: 32, height: 32,
                            "&:hover": { backgroundColor: "#d42a3f" }
                        }}
                    >
                        {uploadLoading
                            ? <CircularProgress size={16} sx={{ color: "#fff" }} />
                            : <PhotoCameraIcon sx={{ fontSize: 18 }} />
                        }
                    </IconButton>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handlePhotoChange}
                    />
                </Box>

                {/* Name & Username */}
                <Box sx={{ mt: 1, ml: 2 }}>
                    <Typography variant="h6" fontWeight={700} color="text.primary">
                        {user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        @{user?.username}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Stats */}
                <Box display="flex" justifyContent="space-around" sx={{ mb: 2 }}>
                    {[
                        { label: "Followers", value: user?.followersCount },
                        { label: "Following", value: user?.followingCount },
                        { label: "Bookmarks", value: user?.bookmarksCount },
                    ].map((stat) => (
                        <Box key={stat.label} textAlign="center">
                            <Typography fontWeight={700} color="text.primary">{stat.value ?? 0}</Typography>
                            <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}