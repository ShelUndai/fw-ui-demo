      <header className="sticky top-0 z-10 flex flex-col border-b bg-background">
        <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
          <h1 className="text-lg font-semibold">MOZ Dash</h1>
          <span className="text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">CR Validation Automation</span>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("[v0] Logout clicked")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs text-muted-foreground">{APP_VERSION}</div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 sm:px-6">
          <TabsList className="h-10">
            <TabsTrigger value="validation" className="gap-2">
              <Search className="h-4 w-4" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              Historical Logs
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
