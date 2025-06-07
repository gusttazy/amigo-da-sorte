"use server";

import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

export type CreateGroupState = {
  success: null | boolean;
  message?: string;
};

export async function createGroup(
  _previousState: CreateGroupState,
  formData: FormData
): Promise<CreateGroupState> {
  const supabase = await createClient();

  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError) {
    return {
      success: false,
      message: "Ocorreu um erro ao criar um grupo.",
    };
  }

  const names = formData.getAll("name");
  const emails = formData.getAll("email");
  const groupName = formData.get("group-name");

  if (!groupName) {
    return {
      success: false,
      message: "Nome do grupo é obrigatório.",
    };
  }

  const { data: newGroup, error: groupError } = await supabase
    .from("groups")
    .insert({
      name: groupName,
      owner_id: authUser.user.id,
    })
    .select()
    .single();

  if (groupError) {
    return {
      success: false,
      message: "Ocorreu um erro ao criar o grupo.",
    };
  }

  const participantes = names.map((name, index) => ({
    group_id: newGroup.id,
    name,
    email: emails[index]?.toString() || "",
  }));

  const { data: createdParticipantes, error: errorParticipantes } =
    await supabase.from("participantes").insert(participantes).select();

  if (errorParticipantes) {
    return {
      success: false,
      message:
        "Ocorreu um erro ao adicionar os participantes ao grupo. Por favor, tente novamente.",
    };
  }

  const drawnParticipantes = drawGroup(createdParticipantes);

  const { error: errorDraw } = await supabase
    .from("participantes")
    .upsert(drawnParticipantes);

  if (errorDraw) {
    return {
      success: false,
      message:
        "Ocorreu um erro ao sortear os participantes do grupo. Por favor, tente novamente.",
    };
  }

  return {
    success: true,
    message: "Grupo criado com sucesso!",
  };

  // redirect('app/grupos/${newGroup.id}');
}

type Participante = {
  id: string;
  group_id: string;
  name: string;
  email: string;
  assigned_to: string | null;
  created_at: string;
};

function drawGroup(participantes: Participante[]) {
  const selectedParticipantes: string[] = [];

  return participantes.map((participante) => {
    const availableParticipantes = participantes.filter(
      (p) => p.id !== participante.id && !selectedParticipantes.includes(p.id)
    );

    const assignedParticipante =
      availableParticipantes[
        Math.floor(Math.random() * availableParticipantes.length)
      ];

    selectedParticipantes.push(assignedParticipante.id);

    return {
      ...participante,
      assigned_to: assignedParticipante.id,
    };
  });
}
