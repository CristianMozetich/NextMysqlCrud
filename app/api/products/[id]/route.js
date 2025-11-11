import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(
        
        'obteniendo producto'
    )
}

export function DELETE() {
    return NextResponse.json(
        
        'eliminando producto'
    )
}

export function PUT() {
    return NextResponse.json(
        
        'actualizando producto'
    )
}