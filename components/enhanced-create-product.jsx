import { useState } from 'react'
import { Loader2, Upload, Plus, Minus, HelpCircle, X, ChevronRight, ChevronLeft, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  price: z.number().int().min(1, "Price must be at least 1"),
  discountedPrice: z.number().int().min(0).optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  productInfo: z.object({
    Overview: z.string(),
    Features: z.string(),
    Specs: z.string(),
  }),
  images: z.array(z.string()).min(1, "At least one image is required"),
})

export function EnhancedCreateProductComponent() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showDiscountedPrice, setShowDiscountedPrice] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    discountedPrice: 0,
    discountPercentage: 0,
    stock: 0,
    productInfo: {
      Overview: '',
      Features: '',
      Specs: '',
    },
    images: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseInt(value) || 0 : value,
    }))
  }

  const handleProductInfoChange = (e) => {
    const { name, value } = e.target
    setProductData(prev => ({
      ...prev,
      productInfo: {
        ...prev.productInfo,
        [name]: value,
      },
    }))
  }

  const handleDiscountChange = (value) => {
    const discountPercentage = value[0]
    const discountedPrice = Math.round(productData.price * (1 - discountPercentage / 100))
    setProductData(prev => ({
      ...prev,
      discountPercentage,
      discountedPrice,
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map(file => URL.createObjectURL(file))
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))
  }

  const removeImage = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const validatedData = productSchema.parse(productData)
      // Here you would typically send the data to your backend
      console.log(validatedData)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating API call
      toast.success('Product created successfully!')
      setShowPreviewModal(false)
      // Reset form or redirect
      setProductData({
        name: '',
        description: '',
        price: 0,
        discountedPrice: 0,
        discountPercentage: 0,
        stock: 0,
        productInfo: {
          Overview: '',
          Features: '',
          Specs: '',
        },
        images: [],
      })
      setCurrentStep(1)
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          toast.error(`${err.path.join('.')}: ${err.message}`)
        })
      } else {
        toast.error('Failed to create product. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const ProductPreview = () => (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div
          className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-700 mb-4">
          {productData.images.length > 0 ? (
            <img
              src={productData.images[0]}
              alt={productData.name}
              className="object-cover object-center" />
          ) : (
            <div
              className="flex items-center justify-center h-full bg-gray-700 text-gray-400">No Image</div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-white">{productData.name || 'Product Name'}</h3>
        <p className="text-sm text-gray-400 mt-1">{productData.description || 'Product description...'}</p>
        <div className="mt-2">
          <span className="text-lg font-bold text-cyan-400">
            ${productData.discountedPrice || productData.price || '0'}
          </span>
          {productData.discountedPrice && productData.discountedPrice < productData.price && (
            <span className="ml-2 text-sm text-gray-400 line-through">${productData.price}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-8">
      <ToastContainer theme="dark" />
      <div
        className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Create New Product</h1>
          <Progress
            value={(currentStep / totalSteps) * 100}
            className="mb-6 bg-gray-700"
            indicatorClassName="bg-cyan-500" />
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-cyan-400">Basic Information</h2>
                <div>
                  <Label htmlFor="name" className="text-gray-300">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter a clear product name" />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Describe your product in detail" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-cyan-400">Pricing & Stock</h2>
                <div>
                  <Label htmlFor="price" className="text-gray-300">Price ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative">
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            value={productData.price}
                            onChange={handleInputChange}
                            className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500 pr-8"
                            placeholder="0" />
                          <HelpCircle
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-700 border-gray-600 text-white">
                        <p>Enter the product's retail price (whole number)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="discounted-price-mode"
                    checked={showDiscountedPrice}
                    onCheckedChange={setShowDiscountedPrice}
                    className="data-[state=checked]:bg-cyan-500" />
                  <Label htmlFor="discounted-price-mode" className="text-gray-300">Enable Discounted Price</Label>
                </div>
                {showDiscountedPrice && (
                  <div>
                    <Label htmlFor="discountPercentage" className="text-gray-300">Discount Percentage</Label>
                    <Slider
                      id="discountPercentage"
                      min={0}
                      max={100}
                      step={1}
                      value={[productData.discountPercentage]}
                      onValueChange={handleDiscountChange}
                      className="py-4" />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>0%</span>
                      <span>{productData.discountPercentage}%</span>
                      <span>100%</span>
                    </div>
                    <div className="mt-2">
                      <Label htmlFor="discountedPrice" className="text-gray-300">Discounted Price ($)</Label>
                      <Input
                        id="discountedPrice"
                        name="discountedPrice"
                        type="number"
                        value={productData.discountedPrice}
                        className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="0"
                        readOnly />
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="stock" className="text-gray-300">Stock</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setProductData(prev => ({ ...prev, stock: Math.max(0, prev.stock - 1) }))}
                      className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={productData.stock}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500 text-center" />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setProductData(prev => ({ ...prev, stock: prev.stock + 1 }))}
                      className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-cyan-400">Product Details</h2>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">Overview</TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">Features</TabsTrigger>
                    <TabsTrigger
                      value="specs"
                      className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">Specs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <Textarea
                      name="Overview"
                      value={productData.productInfo.Overview}
                      onChange={handleProductInfoChange}
                      placeholder="Provide a brief overview of the product..."
                      className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                  </TabsContent>
                  <TabsContent value="features">
                    <Textarea
                      name="Features"
                      value={productData.productInfo.Features}
                      onChange={handleProductInfoChange}
                      placeholder="List key features of the product..."
                      className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                  </TabsContent>
                  <TabsContent value="specs">
                    <Textarea
                      name="Specs"
                      value={productData.productInfo.Specs}
                      onChange={handleProductInfoChange}
                      placeholder="Provide detailed specifications..."
                      className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-cyan-400">Product Images</h2>
                <div>
                  <Label htmlFor="image" className="text-gray-300">Upload Images</Label>
                  <div
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-400">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                          <span>Upload files</span>
                          <Input
                            id="image"
                            type="file"
                            className="sr-only"
                            onChange={handleImageUpload}
                            multiple />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {productData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600"
                        onClick={() => removeImage(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-cyan-500 hover:bg-cyan-600 text-white">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
                  <DialogTrigger asChild>
                    <Button className="ml-auto bg-cyan-500 hover:bg-cyan-600 text-white">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 text-white border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-cyan-400">Product Preview</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Review your product details before creating
                      </DialogDescription>
                    </DialogHeader>
                    <ProductPreview />
                    <div className="flex justify-end space-x-2">
                      <Button
                        onClick={() => setShowPreviewModal(false)}
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                        Edit
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white"
                        disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Product...
                          </>
                        ) : (
                          'Create Product'
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>)
  );
}