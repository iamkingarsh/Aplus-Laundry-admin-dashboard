import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req) {
    const { cookies, url } = req;
    const verify = cookies.get("AplusToken");
    console.log(url, verify);
  
    if (!verify && !url.includes('/login')) {
      return NextResponse.redirect("http://localhost:3000/login");
    }
  
    if (verify && url === "http://localhost:3000/") {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    }
  }
  