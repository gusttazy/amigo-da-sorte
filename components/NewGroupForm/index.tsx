"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MailPlus, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";


interface Participante {
    name: string;
    email: string;
}

export default function NewGroupForm({ loggedUser }: { loggedUser: { email: string; id: string } }) {
    const [participantes, setParticipantes] = useState<Participante[]>([
        { name: "", email: loggedUser.email }
    ]);

    const [groupName, setGroupName] = useState<string>("");

    function updateParticipante(
        index: number,
        field: keyof Participante,
        value: string
    ) {
        const updatedParticipantes = [...participantes];
        updatedParticipantes[index][field] = value;
        setParticipantes(updatedParticipantes);
    }

    function removeParticipante(index: number) {
        setParticipantes(
            participantes.filter((_, i) => i !== index)
        )
    }

    function addParticipante() {
        setParticipantes(participantes.concat({ name: "", email: "" }));
    }

    return (
        <div className="min-h-screen flex items-start justify-center p-4">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="font-bold text-2xl">Novo grupo</CardTitle>
                    <CardDescription>Convide seus amigos para participar</CardDescription>
                </CardHeader>

                <form action={() => { }}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="group-name">Nome do grupo</Label>
                            <Input
                                id="group-name"
                                name="group-name"
                                type="text"
                                placeholder="Nome do grupo"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                required
                            />
                        </div>

                        <h2 className="!mt-8 font-bold text-2xl">Participantes</h2>
                        <CardDescription>Adicione e gerencie os participantes do grupo.</CardDescription>
                        {participantes.map((participante, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4"
                            >

                                <div className="flex-row space-y-2 w-full">
                                    <Label htmlFor={`name-${index}`}>Nome</Label>
                                    <Input
                                        id={`name-${index}`}
                                        name="name"
                                        value={participante.name}
                                        placeholder="Nome"
                                        onChange={(e) => {
                                            updateParticipante(index, "name", e.target.value);
                                        }}
                                        required
                                    />
                                </div>

                                <div className="flex-row space-y-2 w-full">
                                    <Label htmlFor={`email-${index}`}>Email</Label>
                                    <Input
                                        id={`email-${index}`}
                                        name="email"
                                        value={participante.email}
                                        type="email"
                                        placeholder="Email"
                                        className="readonly:text-muted-foreground"
                                        onChange={(e) => {
                                            updateParticipante(index, "email", e.target.value);
                                        }}
                                        readOnly={participante.email === loggedUser.email}
                                        required
                                    />
                                </div>

                                <div className="min-w-9">
                                    {participantes.length > 1 && participante.email !== loggedUser.email && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeParticipante(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                            </div>
                        ))}
                    </CardContent>

                    <Separator className="my-4" />

                    <CardFooter className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addParticipante}
                            className="w-full md:w-auto"
                        >
                            Adicionar amigo
                        </Button>

                        <Button
                            type="submit"
                            className="flex items-center justify-center w-full md:w-auto"
                        >
                            <MailPlus className="h-8 w-8 text-white" />
                            <p className="text-white">Criar grupo</p>
                        </Button>
                    </CardFooter>

                </form>
            </Card>
        </div>
    );
}
