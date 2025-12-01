# Development Guide - Financial Suite

## 🚀 QUICK START FOR NEW SESSIONS

### **1. Project Health Check**
```bash
# Verify project structure
ls -la | head -10

# Check Python environment
python --version
python -c "import pandas, numpy; print('Dependencies OK')"

# Check frontend setup
cd item-sales-enhanced && npm --version && cd ..

# Test core analytics
python validate_cube_data.py --help || echo "Script needs testing"
```

### **2. Current Status Check**
```bash
# Read current priorities
cat TODO.md

# Check recent changes
git log --oneline -5 || echo "No git history"

# Verify file structure
find . -name "*.py" | wc -l  # Should show ~20 Python files
find . -name "*.html" | wc -l  # Should show ~15 HTML files
```

## 🛠️ DEVELOPMENT COMMANDS

### **Python Analytics Pipeline**
```bash
# Core validation scripts
python validate_cube_data.py              # Main data validation
python customer_segment_analysis.py       # Customer analytics
python comprehensive_metric_dimension_analysis.py  # Metrics analysis

# Data export scripts
python create_square_schema_excel.py      # Excel documentation
python gap_analysis_for_enhancement.py    # Gap analysis reports

# Quick test all Python scripts
for file in *.py; do echo "Testing $file..."; python "$file" && echo "✅ OK" || echo "❌ FAILED"; done
```

### **Frontend Development**
```bash
# React application
cd item-sales-enhanced
npm install                    # Install dependencies
npm run dev                    # Start development server
npm run build                  # Production build
npm run preview               # Preview production build
cd ..

# Prototype testing
python -m http.server 8000    # Serve HTML prototypes
# Then visit: http://localhost:8000
```

### **Project Analysis**
```bash
# Find specific files
rg --files | rg "\.py$"       # List Python files
rg --files | rg "\.html$"     # List HTML files
rg --files | rg "package.json" # Find Node.js configs

# Search for specific functionality
rg "class.*Analysis" --type py  # Find analysis classes
rg "function.*validate" --type py  # Find validation functions
rg "TODO|FIXME|BUG" --type py     # Find code comments
```

## 🔍 DEBUGGING & TROUBLESHOOTING

### **Common Issues**

#### **Python Script Errors**
```bash
# Missing dependencies
pip install pandas numpy matplotlib

# File not found errors
ls -la *.csv  # Check for required CSV files
python -c "import os; print(os.getcwd())"  # Verify working directory

# Permission issues
chmod +x *.py
```

#### **Frontend Build Issues**
```bash
cd item-sales-enhanced
rm -rf node_modules package-lock.json  # Clean install
npm install
npm run build 2>&1 | tee build.log    # Capture build errors
```

#### **Data Pipeline Issues**
```bash
# Check data file formats
head -5 *.csv  # Verify CSV structure
python -c "import csv; print('CSV module OK')"

# Validate data integrity
python validate_cube_data.py 2>&1 | tee validation.log
```

### **Performance Monitoring**
```bash
# Check file sizes
du -sh * | sort -hr

# Monitor script execution time
time python customer_segment_analysis.py

# Check memory usage
python -c "import psutil; print(f'Memory: {psutil.virtual_memory().percent}%')"
```

## 📋 TESTING PROTOCOLS

### **Unit Testing**
```bash
# Test individual Python modules
python -m pytest *.py -v  # If pytest is available
python -m doctest *.py     # Test docstrings

# Manual testing
python -c "
import validate_cube_data as vcd
print('Module imports successfully')
"
```

### **Integration Testing**
```bash
# End-to-end pipeline test
echo "Testing full analytics pipeline..."
python validate_cube_data.py > validation_results.txt
python customer_segment_analysis.py > customer_results.txt
echo "Pipeline test complete. Check output files."
```

### **Frontend Testing**
```bash
cd item-sales-enhanced
npm test                   # Run test suite (if configured)
npm run lint              # Code quality check
npm run type-check        # TypeScript validation
```

## 🔧 MAINTENANCE TASKS

### **Daily Maintenance**
- [ ] Update TODO.md with progress
- [ ] Run health check commands
- [ ] Test modified scripts
- [ ] Check for new dependencies

### **Weekly Maintenance**
- [ ] Review and clean up temporary files
- [ ] Update documentation
- [ ] Performance optimization review
- [ ] Backup important data/configs

### **Before Major Changes**
- [ ] Create backup of current state
- [ ] Document current working configuration
- [ ] Test rollback procedures
- [ ] Update project context files

## 🚨 EMERGENCY PROCEDURES

### **If Project Won't Start**
1. **Check working directory**: `pwd` should show `/Users/divyac/financial-suite`
2. **Verify file permissions**: `ls -la *.py` should show executable permissions
3. **Test Python environment**: `python --version && python -c "import sys; print(sys.path)"`
4. **Check for corrupted files**: `file *.py | grep -v "Python script"`

### **If Scripts Fail**
1. **Check error messages carefully**
2. **Verify input data exists**: `ls -la *.csv`
3. **Test with minimal data**: Create small test CSV files
4. **Run in debug mode**: Add `print()` statements for debugging

### **If Frontend Won't Build**
1. **Clear cache**: `cd item-sales-enhanced && rm -rf node_modules .next dist`
2. **Reinstall dependencies**: `npm install`
3. **Check Node.js version**: `node --version` (should be 16+)
4. **Review error logs**: Look for specific dependency issues

## 📚 REFERENCE LINKS

### **Documentation**
- `PROJECT_CONTEXT.md` - Overall project overview
- `TODO.md` - Current task list and priorities
- `square_cube_schema_design.md` - Database architecture
- `README_OLAP_CUBE.md` - OLAP implementation details

### **Key Scripts**
- `validate_cube_data.py` - Core validation logic
- `customer_segment_analysis.py` - Customer analytics
- `item-sales-enhanced/src/` - React components

---

**Remember**: Always read TODO.md first, then run the health check before starting work!
