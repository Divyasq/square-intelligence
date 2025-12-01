import pandas as pd
import json
from datetime import datetime

# The schema data (truncated for brevity - will include full data)
schema_data = {
  "cubes": [
    {
      "name": "Catalog",
      "type": "cube",
      "title": "Catalog",
      "isVisible": True,
      "public": True,
      "description": "Catalog object information, used for data about specific items, modifiers, discounts, categories, etc.",
      "connectedComponent": 1,
      "measures": [
        {
          "name": "Catalog.count",
          "title": "Catalog Count",
          "description": "Count of catalog objects",
          "shortTitle": "Count",
          "cumulativeTotal": False,
          "cumulative": False,
          "type": "number",
          "aggType": "count",
          "drillMembers": [],
          "drillMembersGrouped": {
            "measures": [],
            "dimensions": []
          },
          "isVisible": True,
          "public": True
        }
      ],
      "dimensions": [
        {
          "name": "Catalog.merchant_id",
          "title": "Catalog Merchant Id",
          "type": "string",
          "description": "Merchant ID",
          "shortTitle": "Merchant Id",
          "suggestFilterValues": True,
          "isVisible": False,
          "public": False,
          "primaryKey": False
        },
        {
          "name": "Catalog.object_id",
          "title": "Catalog Object Id",
          "type": "string",
          "description": "Catalog object ID",
          "shortTitle": "Object Id",
          "suggestFilterValues": True,
          "isVisible": True,
          "public": True,
          "primaryKey": False
        }
      ],
      "segments": [
        {
          "name": "Catalog.items",
          "title": "Catalog Items",
          "shortTitle": "Items",
          "description": "Only catalog items",
          "isVisible": True,
          "public": True
        }
      ]
    }
    # Note: This is truncated - the full script will include all cubes
  ]
}

def extract_schema_to_excel():
    # Create multiple DataFrames for different aspects
    
    # 1. Cubes Overview
    cubes_data = []
    measures_data = []
    dimensions_data = []
    segments_data = []
    
    for cube in schema_data["cubes"]:
        # Cube overview
        cubes_data.append({
            'Cube Name': cube['name'],
            'Title': cube['title'],
            'Description': cube['description'],
            'Is Visible': cube['isVisible'],
            'Is Public': cube['public'],
            'Type': cube['type'],
            'Connected Component': cube['connectedComponent'],
            'Measures Count': len(cube['measures']),
            'Dimensions Count': len(cube['dimensions']),
            'Segments Count': len(cube['segments'])
        })
        
        # Measures
        for measure in cube['measures']:
            measures_data.append({
                'Cube Name': cube['name'],
                'Measure Name': measure['name'],
                'Title': measure['title'],
                'Description': measure['description'],
                'Short Title': measure['shortTitle'],
                'Type': measure['type'],
                'Aggregation Type': measure['aggType'],
                'Format': measure.get('format', ''),
                'Is Visible': measure['isVisible'],
                'Is Public': measure['public'],
                'Cumulative': measure['cumulative']
            })
        
        # Dimensions
        for dimension in cube['dimensions']:
            dimensions_data.append({
                'Cube Name': cube['name'],
                'Dimension Name': dimension['name'],
                'Title': dimension['title'],
                'Description': dimension['description'],
                'Short Title': dimension['shortTitle'],
                'Type': dimension['type'],
                'Is Visible': dimension['isVisible'],
                'Is Public': dimension['public'],
                'Primary Key': dimension['primaryKey'],
                'Suggest Filter Values': dimension['suggestFilterValues'],
                'Meta Values': str(dimension.get('meta', {}).get('values', [])) if dimension.get('meta', {}).get('values') else ''
            })
        
        # Segments
        for segment in cube['segments']:
            segments_data.append({
                'Cube Name': cube['name'],
                'Segment Name': segment['name'],
                'Title': segment['title'],
                'Short Title': segment['shortTitle'],
                'Description': segment['description'],
                'Is Visible': segment['isVisible'],
                'Is Public': segment['public']
            })
    
    # Create DataFrames
    cubes_df = pd.DataFrame(cubes_data)
    measures_df = pd.DataFrame(measures_data)
    dimensions_df = pd.DataFrame(dimensions_data)
    segments_df = pd.DataFrame(segments_data)
    
    # Write to Excel with multiple sheets
    with pd.ExcelWriter('/Users/divyac/financial-suite/square_schema_analysis.xlsx', engine='openpyxl') as writer:
        cubes_df.to_excel(writer, sheet_name='Cubes Overview', index=False)
        measures_df.to_excel(writer, sheet_name='Measures', index=False)
        dimensions_df.to_excel(writer, sheet_name='Dimensions', index=False)
        segments_df.to_excel(writer, sheet_name='Segments', index=False)
    
    print("Excel file created successfully!")
    print(f"Cubes: {len(cubes_df)}")
    print(f"Measures: {len(measures_df)}")
    print(f"Dimensions: {len(dimensions_df)}")
    print(f"Segments: {len(segments_df)}")

if __name__ == "__main__":
    extract_schema_to_excel()
