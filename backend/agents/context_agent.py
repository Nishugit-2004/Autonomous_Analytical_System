import random

def get_external_context():
    """
    Real-World Context Connectors:
    - Fetches live weather APIs (Mocked)
    - Fetches local event APIs (Mocked)
    """
    # In a real app, this would be an HTTP request to OpenWeatherMap or SeatGeek
    
    events_mock = [
        {"type": "Weather", "severity": "High", "description": "Torrential Downpour / Thunderstorms expected this weekend."},
        {"type": "Local Event", "severity": "Medium", "description": "Major concert (Taylor Swift) at the local stadium on Saturday."},
        {"type": "Economic", "severity": "Low", "description": "Monthly payday effect: Consumer spending historically increases this week."}
    ]
    
    # We will pick the first two for our dashboard
    return events_mock[:2]
