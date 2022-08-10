import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import NavBar from "../components/NavBar";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  async function populateQuote() {
    const req = await fetch("http://localhost:1337/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
      setName(data.name);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      populateQuote();
    } else {
      window.location.href = "/login";
    }
  }, []);

  async function updateQuote(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/quote", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote:tempQuote,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      console.log(data.error);
    }
  }
  
  return localStorage.getItem("token") ? (
    <Box>
      <NavBar /> 
      <Typography align="center" variant="h4">
        {name} Quote
      </Typography>
      <Typography align="center" variant="h6">
       {  quote ||"Add a Quote"}
      </Typography>
      <Box component="form" noValidate onSubmit={updateQuote} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          value={tempQuote}
          label="Quote"
          autoComplete="email"
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Publish
        </Button>
      </Box>  
    </Box>
  ) : (
    <Typography sx={{alignItems:'center',display:'flex',top:0,bottom:0,left:0,right:0,position:'absolute',justifyContent:'center'}}> 
      Loading ...
    </Typography>  
    
  );
}











