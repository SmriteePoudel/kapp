import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
    const data={
        name:'smriti',
    }
    return NextResponse.json(data)
    
}

export async function POST(request: NextRequest){
    try{
          const body = await request.json();

    
    return NextResponse.json(body)
}

    catch(error){
        console.log('error:',error)
        return NextResponse.json(error)
    }
    
}
