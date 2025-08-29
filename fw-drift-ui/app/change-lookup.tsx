"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  Check,
  Clock,
  Download,
  RefreshCw,
  Search,
  X,
  Calendar,
  User,
  CheckCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Updated API response structure for change validation
interface ValidationResult {
  item: string
  category: string
  status: "pass" | "fail" | "warn"
  message: string
  details?: string
  required: boolean
}

interface ChangeValidation {
  change_number: string
  validation_status: "pass" | "fail" | "warn"
  overall_score: number
  execution_time: string
  executed_by: string
  executed_on: string
  script_output: string
  change_info: {
    short_description: string
    state: string
    priority: string
    risk: string
    impact: string
    requested_by: string
    assigned_to: string
    start_date: string
    end_date: string
  }
  validation_results: ValidationResult[]
  summary: {
    total_checks: number
    passed: number
    failed: number
    warnings: number
    required_failed: number
  }
  failed_requirements: string[]
  approval_actions: string[]
}

// Mock API function - replace with your actual API call
const validateChangeRecord = async (changeNumber: string): Promise<ChangeValidation | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Simulate change not found for certain change numbers
  if (changeNumber.toLowerCase().includes("notfound") || changeNumber === "CHG0000000") {
    return null
  }

  // Check if this should be a passing example
  const isPassingExample =
    changeNumber.toLowerCase().includes("pass") ||
    changeNumber.toLowerCase().includes("good") ||
    changeNumber === "CHG0000001"

  if (isPassingExample) {
    // Mock validation data for a passing example
    const scriptOutput = `INFO:cr_validation.attachments:Testing required:
Regression Testing
SIT/Sprint Testing
Entitlement Testing
Cross Browser Testing
UAT
INFO:cr_validation.attachments:TSR file Found: ['TSR 25.07.01.xlsx']
INFO:cr_validation.attachments:TSA file Found: ['Test Strategy and Approach 25.07.01.xlsx']
INFO:cr_validation.attachments:Validation Plan file Found: ['CSO Post-Production Validation plan and Results GRC237720.25.07.01.xlsx']
INFO:cr_validation.callbacks:CI Field Check Passed: All required fields completed
INFO:cr_validation.callbacks:CI Start Time Valid: 2025/01/20 09:00
INFO:cr_validation.callbacks:Test filename 'CSO Test Workbook 25.07.01.xlsx' contains required mnemonic
INFO:cr_validation.attachments.tsr:Mnemonic CSO found in Project Name
INFO:cr_validation.attachments.tsr:Valid test-strategy provided
INFO:cr_validation.attachments.tsr:Valid test repository provided
INFO:cr_validation.attachments.tsr:TSR Data validation passed
INFO:cr_validation.callbacks:CI Validation Plan found and validated
Showing results for CHG127720, Mnemonic: CSO - Production Release
7/1 Production Release for PMC One Power Platform Apps (CSO) - Fully Validated
-----------
Name: Valid ETSAP Template Version; Satisfied: True
Name: All Template Questions Answered; Satisfied: True
Name: Valid Start Date / Lead Time; Satisfied: True
Name: Peer Reviewer Found; Satisfied: True
Name: Has CTasks; Satisfied: True
Name: QE Approvers Required & Present; Satisfied: True
Name: TSAT Required & Upload Found; Satisfied: True
Name: TSR Required & Upload Found; Satisfied: True
Name: TSA Required & Upload Found; Satisfied: True
Name: MTSA Required & Upload Found; Satisfied: True
Name: BAU Test Plan File Required, Found, and Reviewed; Satisfied: True
Name: Review TSAT File Data/Answers; Satisfied: True
Name: Review TSR File Data/Answers; Satisfied: True
Name: Review TSA File Data/Answers; Satisfied: True
Name: Review MTSA File Data/Answers; Satisfied: True
Name: Review Test Results; Satisfied: True
Name: Review Validation Plan File Data/Answers; Satisfied: True
-- Totals --
Passed: 17
Failed: 0
-----------`

    return {
      change_number: changeNumber,
      validation_status: "pass",
      overall_score: 100, // All checks passed
      execution_time: "1m 45s",
      executed_by: "automation-service",
      executed_on: new Date().toISOString(),
      script_output: scriptOutput,
      change_info: {
        short_description: "7/1 Production Release for PMC One Power Platform Apps (CSO) - Fully Validated",
        state: "Implement",
        priority: "3 - Moderate",
        risk: "Low",
        impact: "Medium",
        requested_by: "John Smith",
        assigned_to: "Network Team",
        start_date: "2025-01-20T09:00:00Z",
        end_date: "2025-01-20T11:00:00Z",
      },
      validation_results: [], // Keep empty since we're using script_output
      summary: {
        total_checks: 17,
        passed: 17,
        failed: 0,
        warnings: 0,
        required_failed: 0,
      },
      failed_requirements: [], // No failed requirements for passing example
      approval_actions: ["Approve CR"], // Approval action for passing validation
    }
  } else {
    // Mock validation data for a failing example (original failing data)
    const scriptOutput = `INFO:cr_validation.attachments:Testing required:
Regression Testing
SIT/Sprint Testing
Entitlement Testing
Cross Browser Testing
UAT
WARNING:cr_validation.attachments:More than 1 TSR file Found: ['TSR 25.07.01 Updated Link.xlsx', 'TSR 25.07.01.xlsx']
WARNING:cr_validation.attachments:More than 1 TSA file Found: ['Test Strategy and Approach 25.07.01.xlsx', 'T25 Strategy and Approach 25.07.01.Updated.xlsx']
WARNING:cr_validation.attachments:More than 1 Validation Plan file Found: ['CSO Post-Production Validation plan and Results GRC237720.25.07.01.xlsx', 'RESULTS CSO Post-Production Validation P
ERROR:cr_validation.callbacks:CI Field Check Failed for the following Regex: Provide a\ What\ will\ the\ post-implementation\ validation\ prove\?\w+\.\w+\.\w+\ Which\ applications\ will\ need\ to
ERROR:cr_validation.callbacks:CI Field Check Failed for the following Regex: \\ What\ will\ the\ post-implementation\ validation\ prove\?\w+\.\w+\.\w+\ Which\ applications\ will\ need\ to
ERROR:cr_validation.callbacks:CI Field Check Failed for the following Regex: \\ What\ will\ the\ post-implementation\ validation\ prove\?\w+\.\w+\.\w+\ Which\ applications\ will\ need\ to
WARNING:cr_validation.callbacks:CI Start Time Already Passed 2024/07/19 09:00
WARNING:cr_validation.callbacks:Test filename 'Test Workbook 25.07.01.xlsx' does not contain CSO mnemonic
ERROR:cr_validation.attachments.tsr:Mnemonic CSO not found in Project Name:
ERROR:cr_validation.attachments.tsr:Invalid test-strategy provided
ERROR:cr_validation.attachments.tsr:Invalid test repository provided
WARNING:cr_validation.attachments.tsr:Auto TSR: Data is missing for all columns, Manual review required for Test Sets!
WARNING:cr_validation.attachments.tsr:Auto TSR: Data is missing for certain columns: [['Component', 'Description', 'Values', 'Environment', 'Associated with Automated Control', 'Epic Link', '
ERROR:cr_validation.attachments.tsr:TSR file was not found
ERROR:cr_validation.callbacks:CI Field Check Failed for the following Regex: \\ What\ will\ the\ post-implementation\ validation\ prove\?\w+\.\w+\.\w+\ Which\ applications\ will\ need\ to
INFO:cr_validation.callbacks:CI Validation Plan Regex Parsing Failed - Checking for Validation Plan File
Showing results for CHG127720, Mnemonic: CSO - Rapid Prototyping
7/1 Production Release for PMC One Power Platform Apps (CSO)
-----------
Name: Valid ETSAP Template Version; Satisfied: True
Name: All Template Questions Answered; Satisfied: False
Name: Valid Start Date / Lead Time; Satisfied: False
Name: Peer Reviewer Found; Satisfied: True
Name: Has CTasks; Satisfied: True
Name: QE Approvers Required & Present; Satisfied: True
Name: TSAT Required & Upload Found; Satisfied: True
Name: TSR Required & Upload Found; Satisfied: True
Name: TSA Required & Upload Found; N/A
Name: MTSA Required & Upload Found; Satisfied: False
Name: BAU Test Plan File Required, Found, and Reviewed; N/A
Name: Review TSAT File Data/Answers; Satisfied: True
Name: Review TSR File Data/Answers; Satisfied: False
Name: Review TSA File Data/Answers; N/A
Name: Review MTSA File Data/Answers; Satisfied: False
Name: Review Test Results; Satisfied: True
Name: Review Validation Plan File Data/Answers; Satisfied: False
-- Totals --
Passed: 8
Failed: 6
-----------`

    return {
      change_number: changeNumber,
      validation_status: "fail",
      overall_score: 57, // 8 passed out of 14 total = ~57%
      execution_time: "2m 34s",
      executed_by: "automation-service",
      executed_on: new Date().toISOString(),
      script_output: scriptOutput,
      change_info: {
        short_description: "7/1 Production Release for PMC One Power Platform Apps (CSO)",
        state: "Implement",
        priority: "3 - Moderate",
        risk: "Medium",
        impact: "Medium",
        requested_by: "John Smith",
        assigned_to: "Network Team",
        start_date: "2025-01-15T02:00:00Z",
        end_date: "2025-01-15T04:00:00Z",
      },
      validation_results: [], // Keep empty since we're using script_output
      summary: {
        total_checks: 14,
        passed: 8,
        failed: 6,
        warnings: 5,
        required_failed: 6,
      },
      failed_requirements: [
        "All Template Questions Answered",
        "Valid Start Date / Lead Time",
        "MTSA Required & Upload Found",
        "Review TSR File Data/Answers",
        "Review MTSA File Data/Answers",
        "Review Validation Plan File Data/Answers",
      ],
      approval_actions: [], // No approval actions for failing validation
    }
  }
}

// Get status badge based on change state
const getStateBadge = (state: string) => {
  switch (state.toLowerCase()) {
    case "new":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          <Clock className="w-3 h-3 mr-1" /> New
        </Badge>
      )
    case "assess":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <AlertCircle className="w-3 h-3 mr-1" /> Assess
        </Badge>
      )
    case "authorize":
      return (
        <Badge className="bg-orange-500 hover:bg-orange-600">
          <AlertCircle className="w-3 h-3 mr-1" /> Authorize
        </Badge>
      )
    case "scheduled":
      return (
        <Badge className="bg-purple-500 hover:bg-purple-600">
          <Calendar className="w-3 h-3 mr-1" /> Scheduled
        </Badge>
      )
    case "implement":
      return (
        <Badge className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="w-3 h-3 mr-1" /> Implement
        </Badge>
      )
    case "review":
      return (
        <Badge className="bg-indigo-500 hover:bg-indigo-600">
          <Search className="w-3 h-3 mr-1" /> Review
        </Badge>
      )
    case "closed":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <Check className="w-3 h-3 mr-1" /> Closed
        </Badge>
      )
    case "canceled":
      return (
        <Badge variant="outline">
          <X className="w-3 h-3 mr-1" /> Canceled
        </Badge>
      )
    default:
      return <Badge variant="outline">{state}</Badge>
  }
}

// Get priority badge
const getPriorityBadge = (priority: string) => {
  if (priority.includes("1") || priority.toLowerCase().includes("critical")) {
    return <Badge className="bg-red-500 hover:bg-red-600">{priority}</Badge>
  } else if (priority.includes("2") || priority.toLowerCase().includes("high")) {
    return <Badge className="bg-orange-500 hover:bg-orange-600">{priority}</Badge>
  } else if (priority.includes("3") || priority.toLowerCase().includes("moderate")) {
    return <Badge className="bg-yellow-500 hover:bg-yellow-600">{priority}</Badge>
  } else {
    return <Badge variant="outline">{priority}</Badge>
  }
}

// Get risk/impact badge
const getRiskImpactBadge = (level: string) => {
  switch (level.toLowerCase()) {
    case "high":
      return <Badge className="bg-red-500 hover:bg-red-600">{level}</Badge>
    case "medium":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">{level}</Badge>
    case "low":
      return <Badge className="bg-green-500 hover:bg-green-600">{level}</Badge>
    default:
      return <Badge variant="outline">{level}</Badge>
  }
}

// Convert validation result to CSV
const convertToCSV = (validationResult: ChangeValidation): string => {
  const headers = [
    "Change Number",
    "Validation Status",
    "Overall Score",
    "Execution Time",
    "Executed By",
    "Executed On",
    "Total Checks",
    "Passed",
    "Failed",
    "Warnings",
    "Required Failed",
  ]

  const values = [
    validationResult.change_number,
    validationResult.validation_status,
    validationResult.overall_score,
    validationResult.execution_time,
    validationResult.executed_by,
    validationResult.executed_on,
    validationResult.summary.total_checks,
    validationResult.summary.passed,
    validationResult.summary.failed,
    validationResult.summary.warnings,
    validationResult.summary.required_failed,
  ]

  let csv = headers.join(",") + "\n"
  csv += values.join(",") + "\n\n"

  // Add validation results
  csv += "Validation Results\n"
  csv += "Item,Category,Status,Required,Message,Details\n"
  validationResult.validation_results.forEach((result, index) => {
    csv += `"${result.item}","${result.category}","${result.status}","${result.required}","${result.message}","${result.details || ""}"\n`
  })

  return csv
}

// Download CSV file
const downloadCSV = (validationResult: ChangeValidation) => {
  const csv = convertToCSV(validationResult)
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${validationResult.change_number}_validation.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Extract the "Showing results for..." line from script output and format with pipes
const extractShowingResultsLine = (scriptOutput: string): string => {
  const lines = scriptOutput.split("\n")
  const showingResultsIndex = lines.findIndex((line) => line.startsWith("Showing results for"))

  if (showingResultsIndex !== -1) {
    // Get the "Showing results for..." line and potentially the next lines until we hit dashes
    let fullDescription = ""
    let currentIndex = showingResultsIndex

    // Collect all lines from "Showing results for..." until we hit the dashes
    while (currentIndex < lines.length && !lines[currentIndex].startsWith("-----------")) {
      if (currentIndex === showingResultsIndex) {
        // First line: "Showing results for CHG127720, Mnemonic: CSO - Production Release"
        fullDescription += lines[currentIndex]
      } else if (lines[currentIndex].trim() !== "") {
        // Additional description lines
        fullDescription += " " + lines[currentIndex].trim()
      }
      currentIndex++
    }

    // Parse the combined description
    // Example: "Showing results for CHG127720, Mnemonic: CSO - Production Release 7/1 Production Release for PMC One Power Platform Apps (CSO) - Fully Validated"
    const match = fullDescription.match(/Showing results for ([^,]+), Mnemonic: ([A-Z]+)\s*-\s*(.+)/)
    if (match) {
      const changeNumber = match[1].trim()
      const mnemonic = match[2].trim()
      const description = match[3].trim()
      return `${changeNumber} | Mnemonic: ${mnemonic} | ${description}`
    }

    // Fallback if regex doesn't match
    const fallbackMatch = fullDescription.match(/Showing results for ([^,]+), (.+)/)
    if (fallbackMatch) {
      const changeNumber = fallbackMatch[1].trim()
      const rest = fallbackMatch[2].trim()
      return `${changeNumber} | ${rest}`
    }
  }

  return "No results found"
}

export default function ChangeLookupPage() {
  const [changeNumber, setChangeNumber] = useState("")
  const [validationResult, setValidationResult] = useState<ChangeValidation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleValidation = async () => {
    if (!changeNumber.trim()) {
      setError("Please enter a change number")
      return
    }

    setLoading(true)
    setError(null)
    setValidationResult(null)

    try {
      const result = await validateChangeRecord(changeNumber.trim())
      if (result === null) {
        setError(`Change number "${changeNumber}" was not found. Please verify the change number and try again.`)
      } else {
        setValidationResult(result)
      }
    } catch (err) {
      setError("Failed to validate change record. Please check the change number and try again.")
      console.error("API Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleValidation()
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <h1 className="text-lg font-semibold">MOZ Dash</h1>
        <div className="text-sm text-muted-foreground">CR Validation Automation</div>
      </header>

      <main className="flex-1 grid grid-rows-[auto_1fr] gap-4 p-4 md:gap-6 md:p-6 overflow-hidden">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Enter a Change Number to Validate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <Label htmlFor="change-number">Enter a Change Number to Validate</Label>
                <Input
                  id="change-number"
                  placeholder="CHG0000123"
                  value={changeNumber}
                  onChange={(e) => setChangeNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
              <Button
                onClick={handleValidation}
                disabled={loading || !changeNumber.trim()}
                className="md:w-auto w-full"
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Validate Change
                  </>
                )}
              </Button>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {validationResult && (
          <div className="grid grid-rows-[auto_auto_1fr_auto] gap-4 h-full overflow-hidden">
            {/* Header with Actions - more compact */}
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Validation Results</h3>
                <p className="text-sm text-muted-foreground">
                  {extractShowingResultsLine(validationResult.script_output)}
                </p>
              </div>
              <div className="flex items-start gap-2 md:mt-0 mt-2">
                <Button size="sm" onClick={() => downloadCSV(validationResult)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </Button>
              </div>
            </div>

            {/* Main Content Grid - Output on left, Requirements on right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
              {/* AWX-Style Script Output - left side, scrollable */}
              <Card className="flex flex-col overflow-hidden">
                <CardHeader className="pb-3 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Validation Output</CardTitle>
                      <CardDescription className="text-sm">Automation script execution results</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1 text-left items-start">
                        <div className="text-xs font-medium text-muted-foreground">Overall Score</div>
                        <div className="flex items-center gap-2">
                          <div className="w-16">
                            <Progress value={validationResult.overall_score} className="h-1.5" />
                          </div>
                          <div className="text-sm font-bold min-w-[3rem]">{validationResult.overall_score}%</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        {validationResult.validation_status === "pass" ? (
                          <Badge className="bg-green-500 hover:bg-green-600 text-xs px-2 py-0.5">
                            <Check className="w-2.5 h-2.5 mr-1" /> Ready
                          </Badge>
                        ) : validationResult.validation_status === "warn" ? (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs px-2 py-0.5">
                            <AlertTriangle className="w-2.5 h-2.5 mr-1" /> Caution
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500 hover:bg-red-600 text-xs px-2 py-0.5">
                            <X className="w-2.5 h-2.5 mr-1" /> Not Ready
                          </Badge>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {validationResult.summary.passed}/{validationResult.summary.total_checks} passed
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm h-full overflow-auto">
                    <pre className="whitespace-pre-wrap">
                      {validationResult.script_output.split("\n").map((line, index) => {
                        const lineNumber = index + 1
                        let lineClass = "text-gray-100"

                        if (line.startsWith("INFO:")) {
                          lineClass = "text-blue-400"
                        } else if (line.startsWith("WARNING:")) {
                          lineClass = "text-yellow-400"
                        } else if (line.startsWith("ERROR:")) {
                          lineClass = "text-red-400"
                        } else if (line.includes("Satisfied: True")) {
                          lineClass = "text-green-400"
                        } else if (line.includes("Satisfied: False")) {
                          lineClass = "text-red-400"
                        } else if (line.includes("Passed:") || line.includes("Failed:")) {
                          lineClass = "text-white font-semibold"
                        }

                        return (
                          <div key={index} className="flex">
                            <span className="text-gray-500 select-none w-8 text-right mr-4 flex-shrink-0">
                              {lineNumber}
                            </span>
                            <span className={lineClass}>{line}</span>
                          </div>
                        )
                      })}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Right side - Action Items */}
              <div className="flex flex-col gap-4 overflow-hidden">
                {/* Action Items Section - shows different content based on validation status */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="pb-3 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      {validationResult.validation_status === "pass" ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <h3 className="text-base font-semibold">Ready for Approval</h3>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <h3 className="text-base font-semibold">Next Steps & Action Items</h3>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {validationResult.validation_status === "pass"
                        ? "All validation checks passed - ready to proceed"
                        : "Complete these items to improve validation score"}
                    </p>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="space-y-3 h-full overflow-y-auto">
                      {/* Show approval actions for passing validation */}
                      {validationResult.approval_actions.map((action, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">
                            {index + 1}
                          </div>
                          <Card className="flex-1">
                            <CardContent className="p-3">
                              <span className="text-sm font-medium text-green-700 dark:text-green-300">{action}</span>
                            </CardContent>
                          </Card>
                        </div>
                      ))}

                      {/* Show failed requirements for failing validation */}
                      {validationResult.failed_requirements.map((requirement, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full flex-shrink-0">
                            {index + 1}
                          </div>
                          <Card className="flex-1">
                            <CardContent className="p-3">
                              <span className="text-sm font-medium">{requirement}</span>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Execution Details - more compact */}
            <Card className="flex-shrink-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Execution Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Executed By</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{validationResult.executed_by}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Executed On</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{new Date(validationResult.executed_on).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

