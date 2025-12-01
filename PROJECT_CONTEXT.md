# Financial Suite Prototype - Project Context

## 🎯 PROJECT MISSION
Building a comprehensive financial analytics platform for Square POS systems with OLAP capabilities, AI-powered reporting, and modern React frontend.

## 👤 PROJECT OWNER
**User Profile**: Developer building financial analytics suite
**Experience Level**: Intermediate to Advanced
**Primary Goals**: 
- Create production-ready financial analytics platform
- Integrate OLAP cube with modern frontend
- Enable AI-powered business intelligence reporting

## 🏗️ ARCHITECTURE OVERVIEW

### **Technology Stack**
- **Backend**: Python (analytics), SQL (OLAP cube), FastAPI (planned)
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Database**: OLAP cube with star/snowflake schema
- **Analytics**: 20+ Python scripts for data processing and validation
- **Deployment**: GitHub Pages (current), Cloud deployment (planned)

### **Core Components**
1. **OLAP Cube Engine** - Multi-dimensional data analysis
2. **Python Analytics Pipeline** - Data processing and validation
3. **React Dashboard** - Interactive reporting interface
4. **AI Report Builder** - Natural language query processing

## 📁 PROJECT STRUCTURE

### **Key Directories**
```
/financial-suite/
├── item-sales-enhanced/     # React/TypeScript frontend application
├── custom-reports-prototype/ # HTML/CSS/JS prototypes
├── *.py                     # Python analytics scripts (20+ files)
├── *.sql                    # Database schema and queries
├── *.md                     # Documentation and specifications
└── *.html                   # Dashboard prototypes and animations
```

### **Critical Files**
- `TODO.md` - Current task tracking and project status
- `PROJECT_CONTEXT.md` - This file (project overview)
- `validate_cube_data.py` - Core data validation pipeline
- `item-sales-enhanced/package.json` - Frontend dependencies
- `square_cube_schema_design.md` - Database architecture
- `comprehensive_metric_dimension_analysis.py` - Analytics engine

## 🎯 CURRENT PROJECT STATE

### **Completed Components**
- ✅ OLAP cube schema design and implementation
- ✅ 20+ Python analytics scripts for data processing
- ✅ React/TypeScript frontend foundation
- ✅ Interactive HTML prototypes and animations
- ✅ Comprehensive documentation and specifications

### **In Progress**
- 🔄 Integration between Python backend and React frontend
- 🔄 API layer design and implementation
- 🔄 End-to-end testing of analytics pipeline

### **Next Priorities** (See TODO.md for details)
1. **Core Integration** - Connect all components
2. **Frontend Enhancement** - Complete React application
3. **Data Pipeline** - Automated processing workflow

## 🔧 DEVELOPMENT WORKFLOW

### **Preferred Working Style**
- Use sub-agents for parallel development streams
- Maintain TODO.md for task tracking
- Test components incrementally
- Focus on integration over perfection

### **Key Commands & Tools**
```bash
# Frontend development
cd item-sales-enhanced && npm run dev

# Python analytics
python validate_cube_data.py
python customer_segment_analysis.py

# Project analysis
rg --files | head -20  # List key files
```

### **Testing Strategy**
1. **Unit Testing** - Individual Python scripts
2. **Integration Testing** - End-to-end data flow
3. **Frontend Testing** - React component functionality
4. **Performance Testing** - Query response times

## 🚨 KNOWN ISSUES & CONSTRAINTS

### **Technical Debt**
- Some Python scripts may have dependency issues
- Frontend-backend integration not yet implemented
- No automated testing pipeline
- Limited error handling in some components

### **Dependencies**
- Python: pandas, numpy, csv (standard library)
- React: See item-sales-enhanced/package.json
- Database: Requires proper OLAP cube setup

## 📊 SUCCESS METRICS

### **Technical KPIs**
- All Python scripts execute without errors
- React frontend builds and runs successfully
- API responses under 3 seconds
- Data validation passes 100%

### **Business KPIs**
- Accurate financial reporting
- Real-time dashboard updates
- Intuitive user experience
- Scalable architecture

## 🔄 SESSION HANDOFF PROTOCOL

### **For New Sessions**
1. **Read this file first** for project context
2. **Check TODO.md** for current priorities
3. **Run project health check** (see DEVELOPMENT_GUIDE.md)
4. **Update status** before starting new work

### **Before Ending Sessions**
1. **Update TODO.md** with progress
2. **Document any issues** in ISSUES_LOG.md
3. **Commit changes** if using version control
4. **Update session notes** in SESSION_NOTES.md

## 💡 AI AGENT INSTRUCTIONS

### **Preferred Approach**
- Use sub-agents for complex, parallel tasks
- Maintain focus on integration and user value
- Test frequently, document thoroughly
- Ask clarifying questions when requirements are unclear

### **Extension Usage**
- **Developer**: Primary tool for code analysis and execution
- **Todo**: Essential for project tracking
- **Dynamic Task**: Use for parallel sub-agent work
- **Tutorial**: Reference for best practices

### **Communication Style**
- Be proactive with suggestions
- Explain technical decisions clearly
- Provide options when multiple approaches exist
- Focus on practical, actionable solutions

---

**Last Updated**: 2025-11-26
**Project Phase**: Integration & Testing
**Next Milestone**: End-to-end working prototype
