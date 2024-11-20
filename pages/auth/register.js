import { useEffect, useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dumbbell,
  User,
  Mail,
  Calendar,
  Scale,
  Ruler,
  Target,
  Activity,
  Lock,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().optional(),
  height: z
    .number()
    .min(50, "Height must be at least 50 cm")
    .max(300, "Height must be less than 300 cm"),
  weight: z
    .number()
    .min(20, "Weight must be at least 20 kg")
    .max(500, "Weight must be less than 500 kg"),
  fitnessGoals: z.array(z.string()).min(1, "Select at least one fitness goal"),
  targetWeight: z.number().optional(),
  activityLevel: z.string().min(1, "Activity level is required"),
  exerciseDays: z
    .number()
    .min(0, "Must be at least 0")
    .max(7, "Must be at most 7"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function register() {
  const route = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    height: 0,
    weight: 0,
    fitnessGoals: [],
    targetWeight: undefined,
    activityLevel: "",
    exerciseDays: 0,
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  useEffect(() => {
    if (status == "authenticated") {
      route.push("/");
    }
  }, [status]);
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCheckboxChange = (name, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      registerSchema.parse(formData);
      console.log(formData);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          userdata: {
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            height: formData.height,
            weight: formData.weight,
            fitnessGoals: formData.fitnessGoals,
            targetWeight: formData.targetWeight,
            activityLevel: formData.activityLevel,
            exerciseDays: formData.exerciseDays,
          },
        }),
      });
      const json = await response.json();
      console.log(json);
      if (response.status == 500) {
        console.log("email Already Exists");
        toast.error("email Already Exists");
        setErrors({ email: "email Already Exists" });
        return;
      }
      signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      route.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Fill The Form Data");
        setErrors(error.flatten().fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ButtonSelect = ({ name, options, value, onChange }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          variant={value === option ? "default" : "outline"}
          onClick={() => onChange({ target: { name, value: option } })}
          className="flex-1 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-400"
        >
          {option}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 p-4">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-blue-500/20">
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-8 text-center">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                💪 Fitness Club
              </span>
            </h1>
            <form onSubmit={handleSubmit}>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-8"
              >
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <TabsTrigger
                    value="personal"
                    className="flex items-center justify-center gap-2 text-lg font-semibold"
                  >
                    <User size={20} />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="physical"
                    className="flex items-center justify-center gap-2 text-lg font-semibold"
                  >
                    <Ruler size={20} />
                    Physical
                  </TabsTrigger>
                  <TabsTrigger
                    value="goals"
                    className="flex items-center justify-center gap-2 text-lg font-semibold"
                  >
                    <Target size={20} />
                    Goals
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="flex items-center justify-center gap-2 text-lg font-semibold"
                  >
                    <Activity size={20} />
                    Activity
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="personal" className="space-y-6">
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Personal Information
                      </h2>
                      <div>
                        <Label
                          htmlFor="fullName"
                          className="text-gray-200 font-semibold"
                        >
                          Full Name
                        </Label>
                        <div className="mt-1 relative">
                          <Input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="John Doe"
                          />
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-gray-200 font-semibold"
                        >
                          Email Address
                        </Label>
                        <div className="mt-1 relative">
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="you@example.com"
                          />
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="password"
                          className="text-gray-200 font-semibold"
                        >
                          Password
                        </Label>
                        <div className="mt-1 relative">
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
                            placeholder="••••••••"
                          />
                          <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="dateOfBirth"
                          className="text-gray-200 font-semibold"
                        >
                          Date of Birth
                        </Label>
                        <div className="mt-1 relative">
                          <Input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          />
                          <Calendar
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                        {errors.dateOfBirth && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.dateOfBirth}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-200 font-semibold">
                          Gender (Optional)
                        </Label>
                        <RadioGroup
                          name="gender"
                          value={formData.gender}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, gender: value }))
                          }
                          className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center">
                            <RadioGroupItem value="male" id="male" />
                            <Label
                              htmlFor="male"
                              className="ml-2 text-gray-200"
                            >
                              Male
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="female" id="female" />
                            <Label
                              htmlFor="female"
                              className="ml-2 text-gray-200"
                            >
                              Female
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </TabsContent>

                    <TabsContent value="physical" className="space-y-6">
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Physical Information
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <Label
                            htmlFor="height"
                            className="text-gray-200 font-semibold"
                          >
                            Height (cm)
                          </Label>
                          <div className="mt-1 relative">
                            <Input
                              type="number"
                              id="height"
                              name="height"
                              value={formData.height || ""}
                              onChange={handleInputChange}
                              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
                              placeholder="175"
                            />
                            <Ruler
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                          </div>
                          {errors.height && (
                            <p className="mt-1 text-xs text-red-400">
                              {errors.height}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="weight"
                            className="text-gray-200 font-semibold"
                          >
                            Weight (kg)
                          </Label>
                          <div className="mt-1 relative">
                            <Input
                              type="number"
                              id="weight"
                              name="weight"
                              value={formData.weight || ""}
                              onChange={handleInputChange}
                              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
                              placeholder="70"
                            />
                            <Scale
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                          </div>
                          {errors.weight && (
                            <p className="mt-1 text-xs text-red-400">
                              {errors.weight}
                            </p>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="goals" className="space-y-6">
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Fitness Goals
                      </h2>
                      <div>
                        <Label className="text-gray-200 font-semibold">
                          What are your fitness goals?
                        </Label>
                        <div className="mt-2 space-y-2">
                          {[
                            "Weight loss",
                            "Muscle gain",
                            "Endurance",
                            "Flexibility",
                            "Overall health",
                          ].map((goal) => (
                            <div key={goal} className="flex items-center">
                              <Checkbox
                                id={goal}
                                checked={formData.fitnessGoals.includes(goal)}
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(
                                    "fitnessGoals",
                                    goal,
                                    checked
                                  )
                                }
                              />
                              <Label
                                htmlFor={goal}
                                className="ml-2 text-gray-200"
                              >
                                {goal}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.fitnessGoals && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.fitnessGoals}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="targetWeight"
                          className="text-gray-200 font-semibold"
                        >
                          Target Weight (kg, optional)
                        </Label>
                        <Input
                          type="number"
                          id="targetWeight"
                          name="targetWeight"
                          value={formData.targetWeight || ""}
                          onChange={handleInputChange}
                          className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          placeholder="65"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-6">
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Activity Level
                      </h2>
                      <div>
                        <Label
                          htmlFor="activityLevel"
                          className="text-gray-200 font-semibold"
                        >
                          Current Activity Level
                        </Label>
                        <ButtonSelect
                          name="activityLevel"
                          options={[
                            "Sedentary",
                            "Lightly Active",
                            "Moderately Active",
                            "Very Active",
                          ]}
                          value={formData.activityLevel}
                          onChange={handleInputChange}
                        />
                        {errors.activityLevel && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.activityLevel}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="exerciseDays"
                          className="text-gray-200 font-semibold"
                        >
                          Days per week you currently exercise
                        </Label>
                        <Input
                          type="number"
                          id="exerciseDays"
                          name="exerciseDays"
                          value={formData.exerciseDays || ""}
                          onChange={handleInputChange}
                          className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          placeholder="3"
                          min="0"
                          max="7"
                        />
                        {errors.exerciseDays && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.exerciseDays}
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>

              <div className="mt-8 flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    const tabs = ["personal", "physical", "goals", "activity"];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 hover:scale-105"
                  disabled={activeTab === "personal"}
                >
                  Previous
                </Button>
                {activeTab !== "activity" ? (
                  <Button
                    type="button"
                    onClick={() => {
                      const tabs = [
                        "personal",
                        "physical",
                        "goals",
                        "activity",
                      ];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) {
                        setActiveTab(tabs[currentIndex + 1]);
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Dumbbell className="inline-block mr-2" size={18} />
                    )}
                    {isLoading ? "Submitting..." : "Start Your Fitness Journey"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
register.header = false;
