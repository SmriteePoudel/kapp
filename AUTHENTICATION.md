## Client-Side Usage

### Checking Authentication Status

```typescript
const checkAuthStatus = async () => {
  try {
    const res = await fetch("/api/auth/home", {
      credentials: "include",
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();

      setUser(data);
    } else {
      setUser(null);
    }
  } catch {
    setUser(null);
  }
};
```

### Logging Out

```typescript
const handleSignOut = async () => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    router.push("/");
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getAuthToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = getAuthToken(request);

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({ message: "Success", user: payload });
}
```
