"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useActionState } from "react"
import { login, LoginState } from "@/app/(auth)/login/actions"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Loader, MessageCircle } from "lucide-react"

export default function LoginForm() {

    const [state, formAction, pending] = useActionState<LoginState, FormData>(
        login,
        {
            success: null,
            message: "",
        }
    );


    return (
        <Card className="mx-auto w-full max-w-sm p-8">
            <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-bold">
                    Faça Login
                </CardTitle>
                <CardDescription className="text-base">
                    Preencha com seu email para receber um link de acesso.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email" className="font-semibold">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="exemplo@email.com"
                                required
                                className="h-12 text-base"
                            />
                        </div>

                        {state.success === true && (
                            <Alert className="text-muted-foreground">
                                <MessageCircle className="h-4 w-4 !text-green-600" />
                                <AlertTitle className="text-gray-50">
                                    Sucesso!
                                </AlertTitle>
                                <AlertDescription>
                                    Confira sua caixa de entrada para o link de acesso.
                                </AlertDescription>
                            </Alert>
                        )}

                        {state.success === false && (
                            <Alert className="text-muted-foreground">
                                <MessageCircle className="h-4 w-4 !text-red-600" />
                                <AlertTitle className="text-gray-50">
                                    Erro!
                                </AlertTitle>
                                <AlertDescription>
                                    Ocorreu um erro ao enviar o link de acesso. Por favor, tente novamente.
                                </AlertDescription>
                            </Alert>
                        )}



                        <Button type="submit" className="w-full h-12 font-bold text-base text-white">
                            {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                            Entrar
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
