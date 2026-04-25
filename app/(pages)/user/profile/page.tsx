"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FormBuilder, { FormField } from "@/components/form-builder";
import { useSound } from "@/lib/use-sound";

/* ================= PAGE ================= */
export default function RestaurantProfilePage() {
  /* ================= SOUND STATE ================= */
  const [soundSettings, setSoundSettings] = useState({
    sound: true,
    click: true,
    notification: true,
  });

  const { play } = useSound(soundSettings.sound);

  /* ================= PROFILE STATE ================= */
  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    phone: "",
    level: "Admin",
    duration: "",
    paymentDate: "",
    lastDate: "",
    status: "Active",
    created: "",
    updated: "",
    image: null,
  });

  /* ================= SECURITY STATE ================= */
  const [security, setSecurity] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  /* ================= RESTAURANT STATE ================= */
  const [restaurant, setRestaurant] = useState({
    name: "Royal Food Cafe",
    contact: "9800000000",
    address: "Kathmandu, Nepal",
    openTime: "09:00",
    closeTime: "22:00",
    status: true,
    days: {
      sun: true,
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: false,
    },
  });

  const [days, setDays] = useState({
    sun: true,
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
  });

  /* ================= FORM FIELDS ================= */

  const profileFields: FormField[] = [
    { name: "image", label: "Profile Image", type: "image" },
    { name: "userName", label: "User Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    {
      name: "level",
      label: "Level",
      type: "select",
      options: [
        { label: "Admin", value: "Admin" },
        { label: "Manager", value: "Manager" },
        { label: "Staff", value: "Staff" },
      ],
    },
    { name: "duration", label: "Duration", type: "text" },
    { name: "paymentDate", label: "Payment Date", type: "date" },
    { name: "lastDate", label: "Last Date", type: "date" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
    { name: "created", label: "Created", type: "datetime" },
    { name: "updated", label: "Updated", type: "datetime" },
  ];

  const securityFields: FormField[] = [
    {
      name: "current",
      label: "Current Password",
      type: "password",
      placeholder: "Enter current password",
    },
    {
      name: "newPass",
      label: "New Password",
      type: "password",
      placeholder: "Enter new password",
    },
    {
      name: "confirm",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm new password",
    },
  ];

  const restaurantFields: FormField[] = [
    { name: "name", label: "Restaurant Name", type: "text" },
    { name: "contact", label: "Contact", type: "text" },
    { name: "openTime", label: "Open Time", type: "time" },
    { name: "closeTime", label: "Close Time", type: "time" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Open", value: "true" },
        { label: "Closed", value: "false" },
      ],
    },
    { name: "banner", label: "Banner", type: "image" },
    { name: "address", label: "Address", type: "textarea" },
    { name: "days", label: "Operation Days", type: "days" },
  ];

  const soundFields: FormField[] = [
    { name: "sound", label: "Enable Sound", type: "sound" },
    { name: "click", label: "Click Sound", type: "sound" },
    { name: "notification", label: "Notification Sound", type: "sound" },
  ];

  /* ================= HANDLERS ================= */

  const handleSave = async (values: any) => {
    console.log("PROFILE DATA:", values);
    setProfile(values);
  };

  const handleRestaurantSave = async (values: any) => {
    console.log("RESTAURANT DATA:", values);
    setRestaurant(values);
  };

  const handleSecuritySave = async (values: any) => {
    console.log("SECURITY DATA:", values);

    if (values.newPass !== values.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }

    setSecurity(values);
  };

  const handleSoundSave = async (values: any) => {
    console.log("SOUND SETTINGS:", values);

    setSoundSettings(values);

    if (values.click) play("click");
  };

  const handleSound = (key: string, value: boolean) => {
    if (soundSettings.click) play("click");

    setSoundSettings((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const toggleDay = (key: string) => {
    if (soundSettings.click) play("click");

    setDays((p) => ({
      ...p,
      [key]: !p[key as keyof typeof p],
    }));
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Restaurant Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage profile, security, restaurant info and system sound
        </p>
      </div>

      {/* TABS */}
      <Tabs defaultValue="profile" className="w-full">

        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="sound">Sound</TabsTrigger>
        </TabsList>

        {/* PROFILE */}
        <TabsContent value="profile">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <FormBuilder
                title="Profile Form"
                fields={profileFields}
                defaultValues={profile}
                onSubmit={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECURITY */}
        <TabsContent value="security">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <FormBuilder
                title="Change Password"
                fields={securityFields}
                defaultValues={security}
                onSubmit={handleSecuritySave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* RESTAURANT */}
        <TabsContent value="restaurant">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Restaurant Info</CardTitle>
            </CardHeader>
            <CardContent>
              <FormBuilder
                title="Restaurant Settings"
                fields={restaurantFields}
                defaultValues={restaurant}
                onSubmit={handleRestaurantSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SOUND */}
        <TabsContent value="sound">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Sound System</CardTitle>
            </CardHeader>
            <CardContent>
              <FormBuilder
                title="Sound Settings"
                fields={soundFields}
                defaultValues={soundSettings}
                onSubmit={handleSoundSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}