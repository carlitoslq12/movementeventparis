"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

export default function FormularioEvento() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    title: "",
    email: "",
    phone: "",
  })

  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (data.success) {
        setEnviado(true)
      } else {
        alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.")
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#172966] to-[#0c1c4e] text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        {!enviado ? (
          <>
            {/* Espacio para logo */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-24 bg-white/10 rounded flex items-center justify-center border border-white/20">
                <span className="text-sm text-white/50">Logo Space</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Register to Attend</h1>
              <div className="text-[#a3b3e0] text-sm mb-4">
                <p className="font-medium mb-2">Advancing Health Equity in Middle-Income Countries</p>
                <p>
                  May 20, 2025 | 9:00–10:30 AM | <br /> Paris Room, Hotel Intercontinental Genéve
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#a3b3e0]">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                  className="bg-[#1e357e] border-[#2a4298] text-white placeholder:text-[#6478c0]"
                  placeholder="Your first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#a3b3e0]">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  required
                  className="bg-[#1e357e] border-[#2a4298] text-white placeholder:text-[#6478c0]"
                  placeholder="Your last name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-[#a3b3e0]">
                  Organization
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formState.organization}
                  onChange={handleChange}
                  required
                  className="bg-[#1e357e] border-[#2a4298] text-white placeholder:text-[#6478c0]"
                  placeholder="Your organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#a3b3e0]">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                  className="bg-[#1e357e] border-[#2a4298] text-white placeholder:text-[#6478c0]"
                  placeholder="Your job title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#a3b3e0]">
                  Mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="bg-[#1e357e] border-[#2a4298] text-white placeholder:text-[#6478c0]"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#a3b3e0]">
                  Phone Nr.
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                  className="bg-[#1e357e] border-[#2a4298] text-white placeholder:text-[#6478c0]"
                  placeholder="+41 XX XXX XX XX"
                />
              </div>

              <Button
                type="submit"
                disabled={cargando}
                className="w-full bg-[#3a4db1] hover:bg-[#4a5dc1] text-white font-medium py-2 mt-4"
              >
                {cargando ? "Submitting..." : "Register Now"}
              </Button>

              <p className="text-xs text-[#a3b3e0] text-center mt-4">
                By registering, you agree to receive communications about this event.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-10 px-6 bg-[#1e357e] rounded-lg border border-[#2a4298] shadow-lg">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-[#4a5dc1]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thank You for Registering!</h2>
            <div className="text-[#a3b3e0] text-sm mt-4 mb-6 text-left">
              <p className="mb-2">Thank you for your interest in our event and in the Movement Health Foundation.</p>
              <p className="mb-2">
                Join us at this WHA78 side event to explore how AI, digital innovation, and partnerships are
                transforming health systems in middle-income countries.
              </p>
              <p className="mb-2">Please complete the form to confirm your participation.</p>
              <p>Your information will be used only for event coordination purposes.</p>
            </div>
            <Button
              onClick={() => {
                setEnviado(false)
                setFormState({
                  firstName: "",
                  lastName: "",
                  organization: "",
                  title: "",
                  email: "",
                  phone: "",
                })
              }}
              className="bg-[#3a4db1] hover:bg-[#4a5dc1] text-white"
            >
              Register Another Person
            </Button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-[#a3b3e0]">
          <p>© 2025 Movement Health Foundation. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
