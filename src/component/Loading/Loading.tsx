import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <>
        <Box width={"100%"} minHeight={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress sx={{color:"primary.main"}}  />
        </Box>
    </>
  )
}
