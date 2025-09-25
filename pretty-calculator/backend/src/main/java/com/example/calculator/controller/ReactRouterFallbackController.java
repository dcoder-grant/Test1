package com.example.calculator.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller to handle React client-side routing.
 * When a user navigates directly to a route like /app/settings,
 * this controller ensures they get the index.html file so React Router can handle it.
 */
@Controller
public class ReactRouterFallbackController {
    
    /**
     * Serves the index.html file for all non-API routes.
     * This allows React Router to handle client-side routing properly.
     * Routes starting with /api are excluded as they should be handled by REST controllers.
     */
    @GetMapping("/{path:[^\\.]*}")
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}