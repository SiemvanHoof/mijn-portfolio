"use client";
import { useEffect, useState } from "react";

function calculateAge(birthDate: string) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const now = new Date();
  let age = now.getFullYear() - year;
  const hadBirthday =
    now.getMonth() + 1 > month || (now.getMonth() + 1 === month && now.getDate() >= day);
  if (!hadBirthday) age--;
  return age;
}

export default function Age({ birthDate }: { birthDate: string }) {
  const [age, setAge] = useState(() => calculateAge(birthDate));

  // Opnieuw berekenen in de browser, zodat het altijd klopt, ook zonder nieuwe deploy
  useEffect(() => setAge(calculateAge(birthDate)), [birthDate]);

  return <span suppressHydrationWarning>{age}</span>;
}